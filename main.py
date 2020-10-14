import string

key = input("Key: ")
passwd = input("Password: ")

word = "".join([i for i in passwd if not i.isdigit()])
digit = "".join([i for i in passwd if i.isdigit()])

soma = 0
retorno = "@"


for char in word:
    soma += string.ascii_lowercase.index(char)

for index in str(soma):
    retorno += chr(97 + int(index))
    retorno += index

retorno += key + digit + "$"

print(retorno)

input("")