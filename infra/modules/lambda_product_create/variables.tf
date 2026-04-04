variable "account_id" {
    type = string
    description = "Account Id"
}

variable "project_name" {
    type = string
    description = "Project name"
}

/*variable "vpc_subnet_ids" {
    type = list(string)
    description = "VPC subnet ids"
}

variable "vpc_security_group_ids" {
    type = list(string)
    description = "VPC security group ids"
} */

variable "lambda_cloudwatch_log_retention" {
    type = number
    description = "Lambda cloudwatch log retention"
}

variable "lambda_memory_size" {
    type = number
    description = "Lambda memory size"
}

variable "lambda_timeout" {
    type = number
    description = "Lambda timeout"
}

variable "NODE_ENV" {
    type = string
    description = "NODE_ENV"
}

variable "table_name" {
  type = string
  description = "Table name"
  default = "products"
}