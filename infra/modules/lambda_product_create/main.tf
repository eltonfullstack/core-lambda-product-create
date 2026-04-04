data "aws_caller_identity" "current" {}

data "archive_file" "lambda_file" {
    type        = "zip"
    source_dir  = "${path.root}/../app/dist/"
    output_path = "${path.root}/../app.zip"
    excludes = setunion(
        fileset("${path.root}/../app/", "__test__/**/*.*"),
        fileset("${path.root}/../app/", "coverage/**/*.*"),
        fileset("${path.root}/../app/", ".scannerwork/**/*.*"),
        [
           "jest.config.js",
           "localRunner.js"
        ]
    )
}

resource "aws_lambda_function" "lambda" {
  function_name = var.project_name
  filename = data.archive_file.lambda_file.output_path
  runtime = "nodejs20.x"
  handler = "createProduct.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role = aws_iam_role.lambda_role.arn
  // layers = []
  timeout = var.lambda_timeout
  /* vpc_config {
    subnet_ids = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_ids
  } */
  environment {
    variables = {
      NODE_ENV = var.NODE_ENV
      TABLE_NAME = var.table_name
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_cloudwatch_log_group" {
    name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
    retention_in_days = var.lambda_cloudwatch_log_retention
}

data "aws_iam_policy_document" "lambda_role_assume_policy_doc" {
    statement {
        actions = ["sts:AssumeRole"]
        principals {
            type = "Service"
            identifiers = ["lambda.amazonaws.com"]
        }
    }
}

data "aws_iam_policy_document" "lambda_dynamodb_policy" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:PutItem"
    ]

    resources = [
      "arn:aws:dynamodb:us-east-1:${data.aws_caller_identity.current.account_id}:table/${var.table_name}"
    ]
  }
}

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name   = "${var.project_name}-dynamodb-policy"
  role   = aws_iam_role.lambda_role.id
  policy = data.aws_iam_policy_document.lambda_dynamodb_policy.json
}

resource "aws_iam_role" "lambda_role" {
    name = "${var.project_name}-lambda-role"
    assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "lambda_role_basic_execution_policy_attachment" {
    role = aws_iam_role.lambda_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_role_vpc_policy_attachment" {
    role = aws_iam_role.lambda_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}