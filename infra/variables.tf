variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "lambda_product_create" {
  type        = string
  description = "Lambda product create"
  default     = "lambda-product-create"
}

variable "account_id" {
  type        = string
  description = "Account Id"
}

/*variable "vpce" {
  type = list(string)
  description = "VPC Endpoint"
}

variable "vpc_subnet_ids" {
  type        = list(string)
  description = "VPC subnet ids"
} */

/*variable "vpc_security_group_id" {
  type        = list(string)
  description = "VPC security group ids"
} */

variable "NODE_ENV" {
  type        = string
  description = "NODE_ENV"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_memory_size" {
  type        = number
  description = "Memory size for Lambda function"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention"
}

variable "lambda_maximum_retry_attempts" {
  type        = number
  description = "Lambda maximum retry attempts"
}