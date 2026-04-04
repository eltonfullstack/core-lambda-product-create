terraform {
  backend "s3" {}
}

provider "aws" {
  default_tags {
    tags = {
      core = "product-create"
    }
  }
}

module "lambda_product_create" {
  source                          = "./modules/lambda_product_create"
  project_name                    = var.lambda_product_create
  account_id                      = var.account_id
  //vpc_subnet_ids                  = var.vpc_subnet_ids
  // vpc_security_group_ids          = var.vpc_security_group_id
  lambda_cloudwatch_log_retention = var.lambda_cloudwatch_log_retention
  lambda_memory_size              = var.lambda_memory_size
  lambda_timeout                  = var.lambda_timeout
  NODE_ENV                        = var.NODE_ENV
}