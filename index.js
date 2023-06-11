const express = require('express');
const soap = require('soap');
const xmlBodyParser = require('express-xml-bodyparser');

// Função para converter Celsius em Fahrenheit
function celsiusToFahrenheit(args) {
  const celsius = args.celsius;
  const fahrenheit = (celsius * 9/5) + 32;
  return { fahrenheit };
}

// Função para converter Fahrenheit em Celsius
function fahrenheitToCelsius(args) {
  const fahrenheit = args.fahrenheit;
  const celsius = (fahrenheit - 32) * 5/9;
  return { celsius };
}

// Objeto que representa o serviço
const service = {
  TemperatureService: {
    TemperaturePort: {
      celsiusToFahrenheit: celsiusToFahrenheit,
      fahrenheitToCelsius: fahrenheitToCelsius
    }
  }
};

// Criação do aplicativo Express
const app = express();

// Rota para a URL do WSDL
app.get('/soap/wsdl', (req, res) => {
    const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions name="TemperatureService"
        targetNamespace="http://localhost:3000/TemperatureService.wsdl"
        xmlns="http://schemas.xmlsoap.org/wsdl/"
        xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
        xmlns:tns="http://localhost:3000/TemperatureService.wsdl"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <message name="CelsiusToFahrenheitRequest">
          <part name="celsius" type="xsd:float"/>
        </message>
        <message name="CelsiusToFahrenheitResponse">
          <part name="fahrenheit" type="xsd:float"/>
        </message>
        <message name="FahrenheitToCelsiusRequest">
          <part name="fahrenheit" type="xsd:float"/>
        </message>
        <message name="FahrenheitToCelsiusResponse">
          <part name="celsius" type="xsd:float"/>
        </message>
        <portType name="TemperaturePortType">
          <operation name="celsiusToFahrenheit">
            <input message="tns:CelsiusToFahrenheitRequest"/>
            <output message="tns:CelsiusToFahrenheitResponse"/>
          </operation>
          <operation name="fahrenheitToCelsius">
            <input message="tns:FahrenheitToCelsiusRequest"/>
            <output message="tns:FahrenheitToCelsiusResponse"/>
          </operation>
        </portType>
        <binding name="TemperatureBinding" type="tns:TemperaturePortType">
          <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
          <operation name="celsiusToFahrenheit">
            <soap:operation soapAction="celsiusToFahrenheit"/>
            <input>
              <soap:body use="encoded" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </input>
            <output>
              <soap:body use="encoded" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </output>
          </operation>
          <operation name="fahrenheitToCelsius">
            <soap:operation soapAction="fahrenheitToCelsius"/>
            <input>
              <soap:body use="encoded" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </input>
            <output>
              <soap:body use="encoded" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
            </output>
          </operation>
        </binding>
        <service name="TemperatureService">
          <port name="TemperaturePort" binding="tns:TemperatureBinding">
            <soap:address location="http://localhost:3000/soap"/>
          </port>
        </service>
      </definitions>`;
  
    res.set('Content-Type', 'text/xml');
    res.send(wsdl);
  });

// Adicione a rota para o serviço SOAP
app.post('/soap', xmlBodyParser({ explicitArray: false }), (req, res) => {
    const xml = req.body;
    soap.listen(app, '/soap', service, xml);
  });
  

// Inicie o servidor
app.listen(3000, () => {
    console.log('Servidor SOAP rodando em http://localhost:3000');
  });