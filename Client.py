
from zeep import Client
# instalar zeep

def main():
    while True:
        print("Temperaturas disponíveis para escolher:")
        print("1 - Fahrenheit")
        print("2 - Celsius")
        print('0 - Sair da aplicação')
        valor = int(input("Escolha o tipo de temperatura que deseja utilizar: "))

        if valor == 1:
            print()
            valor = int(input("Digite o valor de uma temperatura: "))
            
            fahrenheit(valor)
        elif valor == 2:
            print()
            valor = int(input("Digite o valor de uma temperatura: "))

            celsius(valor)
        elif valor == 0:
            print("Saindo da aplicação...")
            break


def fahrenheit(args):
    try:
        # Crie uma instância do cliente SOAP
        client = Client('http://localhost:3000/soap/wsdl')


        # Chame o método celsiusToFahrenheit do serviço SOAP
        result = client.service.fahrenheitToCelsius(fahrenheit=args)

        print(f'{args} graus Fahrenheit equivalem a {result} graus Celsius.')
    except Exception as e:
        print(f"Ocorreu um erro ao se conectar ao servidor SOAP: {e}")


def celsius(args):
    try:
        # Crie uma instância do cliente SOAP
        client = Client('http://localhost:3000/soap/wsdl')


        # Chame o método celsiusToFahrenheit do serviço SOAP
        result = client.service.celsiusToFahrenheit(celsius=args)

        print(f'{args} graus Celsius equivalem a {result} graus Fahrenheit.')
    except Exception as e:
        print(f"Ocorreu um erro ao se conectar ao servidor SOAP: {e}")

if __name__ == '__main__':
    main()