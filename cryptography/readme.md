# encryption & decryption wiht openssl

```bash
echo HellowWorld > message.txt
openssl enc -aes-256-cbc -in message.txt -out message.bin
openssl enc -d -aes-256-cbc -in message.bin -out message.dec
cat message.dec
HellowWorld
# Using base64
openssl enc -base64 -in message.bin -out message.b64
openssl enc -d -base64 -in message.b64 -out message.ptx
```

# Priavate Key openssl - RSA

```bash
openssl genpkey -algorithm RSA -out privatekey.pem -pkeyopt rsa_keygen_bits:1024
openssl rsa -pubout -in privatekey.pem -out publickey.pem
```

# encypt/decrypt using RSA private/public key

```bash
openssl rsautl -encrypt -inkey publickey.pem -pubin -in message.txt -out message.rsa
openssl rsautl -decrypt -inkey privatekey.pem -in message.rsa -out message.dec
```