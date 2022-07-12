# projeto-valex  <a href="https://github.com/cassandra-mn/projeto-valex.git"><img src="https://images.emojiterra.com/google/android-pie/512px/1f4b3.png" alt="readme-logo" width="30" height="30" align="center"></a>

## Usage

```bash
$ git clone https://github.com/cassandra-mn/projeto-valex.git

$ cd projeto-valex

$ npm install

$ npm run dev
```

## API

```
- POST /card/create
    - Rota para criar um novo cartão de benefícios
    - headers: {"x-api-key": "$key"}
    - body: {
        "type": "loremipsum",
        "id": 1
    }
    
- POST /card/activate
    - Rota para ativar um cartão
    - headers: {}
    - body: {
        "id": 1,
        "cvc": "123",
        "password": "loremipsum"
    }

- POST /card/block
    - Rota para bloquear um cartão
    - headers: {}
    - body: {
        "id": 1,
        "password": "loremipsum"
    }
    
- POST /card/unlock
    - Rota para desbloquear um cartão
    - headers: {}
    - body: {
        "id": 1,
        "password": "loremipsum"
    }

- POST /card/recharge
    - Rota para recarregar um cartão
    - headers: {"x-api-key": "$key"}
    - body: {
        "id": 1,
        "amount": 123
    }
    
- POST /card/view
    - Rota para visualizar o saldo e as transações
    - headers: {}
    - body: {
        "id": 1
    }

- POST /card/payment/pos
    - Rota para realizar pagamentos com maquininha
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "loremipsum",
        "businessId": 2,
        "amount": 123
    }
    
- POST /card/payment/online
    - Rota para desbloquear um cartão
    - headers: {}
    - body: {
        "card": {
            "number": "0000-111111-22222",
            "cardholderName": "Lorem Ipsum",
            "securityCode": "000",
            "expirationDate": "07/22"
        },
        "businessId": 1,
        "amount": 123
    }

```
