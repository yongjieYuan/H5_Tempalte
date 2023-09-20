/// 放置常量

///个人开户表单需要检验的字段
export const individualFormValidateKeys = [
  'name',
  'number',
  'birthday',
  'occupation',
  'email',
  'phone',
  'idType',
  'idNumber',
  'expireDate',
  'address',
  'source',
  'purpose',
  'baseCurrency',
  'targetCurrency',
  'paymentMethod',
  'recipientName',
  'relationship',
  'contactNumber',
  'recipientAddress',
  'bankName',
  'bankAccountNumber',
  'bankAddress',
  'optionalCode',
  'customerType',
  'customerIdTypeFirst',
  'customerIdIssue',
  'frontPhotoFirst',
  'backPhotoFirst',
  'handPhoto',
  'customerIdTypeTwo',
  'frontPhoto',
  'backPhoto',
  'proofType',
  'proofPhoto',
  'customerName',
  'signatureImage',
  'date'
]

/// 公司开户表单需要检验的字段
export const companyFormValidateKeys = []

/// 补充资料的表单需要的字段
export const otherFormValidateKeys = [
  'customerType',
  'customerIdTypeFirst',
  'frontPhotoFirst',
  'backPhotoFirst',
  'proofType',
  'proofPhoto',
  'handPhoto',
  'customerIdTypeTwo',
  'frontPhoto',
  'frontPhoto',
  'customerName',
  'signatureImage',
  'date'
]
