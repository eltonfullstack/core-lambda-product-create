resource "aws_lambda_permission" "lambda_permission" {
    statement_id  = "AllowExecutionFromAPIGateway"
    action        = "lambda:InvokeFunction"
    function_name = var.lambda_project_name
    principal     = "apigateway.amazonaws.com"
    source_arn    = "${var.api_gateway_deployment_execution_arn}${var.api_gateway_stage_name}/${var.api_gateway_http_method}/${var.api_gateway_path_part}"
}