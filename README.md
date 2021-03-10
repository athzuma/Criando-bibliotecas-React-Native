## Como criar bibliotecas para React Native e Expo e publicar no npm e yarn



## Crie um repositório no GitHub
O primeiro passo é criar um repositório no GitHub e clonar ele em alguma pasta no seu computador. Isso pode ser feito tanto via terminal ou pelo aplicativo GitHub desktop. Selecione a opção de inicializar com o README.

Após criado o repositório, envie o primeiro commit para se certificar se tudo foi criado corretamente.

## Criando o pacote npm
Acesse a pasta do repositório criado anteriormente via terminal, e execute os comandos abaixo:

Informe o autor do projeto:

`$ npm set init.author.name “Seu nome”`

Informe o e-mail:

`$ npm set init.author.email “Seu e-mail”`

Informe a licença:

`$ npm set init.license “MIT”`

Para esse exemplo, vamos utilizar a licença MIT.

Agora vamos associar esse projeto com o seu usuário no npm, para isso é preciso ter uma conta cadastrada em http://npmjs.com. Caso ainda não possua cadastro, faça o cadastro antes de continuar.

`$ npm adduser`

Quando solicitado informe seu nome de usuário, senha e e-mail.

Para criar o package.json execute o comando:
`$ npm init`

Quando solicitado informe, nome do pacote, a versão, uma descrição, para Entry point informe src/index.js, para Test Command deixe em branco, informe o repositório criado do GitHub,  em Keywords informe tags de busca para o seu pacote, e por último informe a licença MIT. Se tudo estiver correto, informe `yes`.

O arquivo package.json vai ser criado na pasta do repositório, para esse exemplo o resultado ficou:
```
{
  "name": "react-native-simplelink",
  "version": "0.0.1",
  "description": "Como criar uma biblioteca para React Native e Expo e publicar no npm",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/athzuma/Criando-bibliotecas-React-Native.git"
  },
  "keywords": [
    "Criar",
    "biblioteca",
    "react",
    "native",
    "expo",
    "npm",
    "simple",
    "link"
  ],
  "author": "Athila Zuma <athzuma@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/athzuma/Criando-bibliotecas-React-Native/issues"
  },
  "homepage": "https://github.com/athzuma/Criando-bibliotecas-React-Native#readme"
}
```


Caso tenha digitado alguma informação errada, é só alterar direto nesse arquivo.

## Crie seu componente React Native
Para esse exemplo vamos criar uma biblioteca para auxiliar na criação de links de forma mais rápida no React Native. Dentro da pasta do repositório criaremos a pasta `src`, e dentro dela os arquivos `index.js` e `simplelink.js`.

simplelink.js
```jsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';

export default class SimpleLink extends React.Component {
  constructor(props){
    super(props);
  }

  open() {
    if (this.props.link == "" || this.props.link == undefined) {
      Linking.openURL(this.props.children);
    } else {
      Linking.openURL(this.props.link);
    }
    if (this.props.onPress !== undefined) {
      this.props.onPress();
    }
  }

  render() {
    const { onPress = null , children, style = {}, link = "", decorationNone = false } = this.props;
    return (
      <TouchableOpacity onPress={() => { this.open() }}>
        <Text
          style={
            [
              style,
              decorationNone ? {} : styles.link
            ]
          }
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
});
```
Aqui você pode criar seu componente da forma que preferir.

index.js
```jsx
export SimpleLink from './simplelink';
```

## Publicando sua biblioteca
Faça um git commit e envie as modificações realizadas para o GitHub. Depois execute o comando abaixo para publicar a biblioteca no npm:
`$ npm publish`

Se tudo ocorreu corretamente, agora a sua biblioteca está publicada e disponível para todos!

O último passo é editar o arquivo README.md com a documentação de como instalar e utilizar a biblioteca criada. Abaixo está a documentação criada para a biblioteca desse exemplo.

## Como instalar a biblioteca no seu projeto
`$ npm i react-native-simplelink`

ou

`$ yarn add react-native-simplelink`

## Como usar
Importe a biblioteca no seu projeto
```jsx
import { SimpleLink } from 'react-native-simplelink';
```

Criando um link para uma página web de forma simples e rápida
```jsx
<SimpleLink>http://google.com</SimpleLink>
```

Criar um link para um endereço diferente do texto de exibição
```jsx
<SimpleLink link="http://github.com">GitHub</SimpleLink>
```

Criar um link sem formatação
```jsx
<SimpleLink decorationNone>http://google.com</SimpleLink>
```

Adicionar formatação adicional
```jsx
<SimpleLink style={{ marginVertical: 20 }}>http://google.com</SimpleLink>
```

Executar funções quando o link for clicado
```jsx
<SimpleLink onPress={() => { console.log('Acessando o google') }}>http://google.com</SimpleLink>
```

Abrir o link por uma função
```jsx
this.link.open();

//…

<SimpleLink
  ref={link => {this.link = link}}
>
  https://google.com
</SimpleLink>

```

## Exemplo completo


<img src="https://bancodev.s3-sa-east-1.amazonaws.com/link.JPG" width="280">

```jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SimpleLink } from 'react-native-simplelink';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    //Abrir um link
    this.link.open();
  }

  render() {
    return (
      <View style={styles.container}>

        <SimpleLink>http://google.com</SimpleLink>
        <SimpleLink link="http://github.com">GitHub</SimpleLink>
        <SimpleLink decorationNone>http://google.com</SimpleLink>
        <SimpleLink style={{ marginVertical: 20 }}>http://google.com</SimpleLink>
        <SimpleLink onPress={() => { console.log('Acessando o google') }}>http://google.com</SimpleLink>

        <SimpleLink
          ref={link => {this.link = link}}
        >
          https://google.com
        </SimpleLink>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
```
