import re
res=re.search(r'\d{17}(\d|X)','我的身份证42152416620874005X').group()
print(res)

