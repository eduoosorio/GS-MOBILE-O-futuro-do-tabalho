# GS-MOBILE-2-SEMESTRE

# Diário de Bem-Estar - Trabalho Híbrido/Remoto

Aplicativo desenvolvido para o projeto da Global Solution da FIAP, disciplina de Mobile Development & IoT.

## 📱 Sobre o Projeto

O **Diário de Bem-Estar** é um aplicativo focado no trabalho híbrido/remoto que permite aos usuários registrar seu humor e nível de estresse diariamente, salvando o histórico localmente no dispositivo. O app aborda o tema "O Futuro do Trabalho" ao promover a conscientização sobre bem-estar no ambiente de trabalho moderno.

## 🎯 Funcionalidades

- ✅ Registro de humor (5 níveis: Muito Feliz a Muito Triste)
- ✅ Registro de nível de estresse (5 níveis: Muito Baixo a Muito Alto)
- ✅ Seleção de modo de trabalho (Remoto, Híbrido ou Presencial)
- ✅ Campo de observações opcional para anotações pessoais
- ✅ Histórico completo de todos os registros
- ✅ Persistência de dados local usando AsyncStorage
- ✅ Interface moderna e intuitiva

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento e deploy
- **AsyncStorage** - Armazenamento local de dados
- **React Navigation** - Navegação entre telas

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (instalado globalmente)
- Aplicativo **Expo Go** no seu smartphone (iOS ou Android) ou um emulador

## 🚀 Como Executar o Projeto

### 1. Instalar as dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 2. Iniciar o servidor Expo

```bash
npm start
```

ou

```bash
expo start
```

### 3. Executar no dispositivo

**Opção 1: Usando o Expo Go (Recomendado)**
- Abra o aplicativo Expo Go no seu smartphone
- Escaneie o QR Code que aparece no terminal ou no navegador
- O app será carregado no seu dispositivo

**Opção 2: Usando emulador**
- Para Android: `npm run android` ou `expo start --android`
- Para iOS (apenas no Mac): `npm run ios` ou `expo start --ios`

## 📁 Estrutura do Projeto

```
GS-Mobile/
├── App.js                 # Componente principal e navegação
├── package.json           # Dependências do projeto
├── app.json              # Configuração do Expo
├── babel.config.js       # Configuração do Babel
├── README.md             # Este arquivo
└── src/
    └── screens/
        ├── RegisterScreen.js   # Tela de registro de bem-estar
        └── HistoryScreen.js    # Tela de histórico de registros
```

## 💾 Persistência de Dados

O aplicativo utiliza **AsyncStorage** para salvar todos os registros localmente no dispositivo. Os dados são armazenados no formato JSON e persistem mesmo após fechar o aplicativo.

**Chave de armazenamento:** `wellnessEntries`

**Estrutura dos dados:**
```json
[
  {
    "id": "timestamp",
    "date": "2024-11-15T10:30:00.000Z",
    "mood": 5,
    "stress": 2,
    "workMode": "remote",
    "notes": "Dia produtivo trabalhando de casa"
  }
]
```

## 🎨 Interface

O aplicativo possui duas telas principais:

1. **Tela de Registro**: Permite ao usuário registrar seu humor, nível de estresse, modo de trabalho e observações
2. **Tela de Histórico**: Exibe todos os registros salvos, ordenados do mais recente para o mais antigo

## 📝 Notas de Desenvolvimento

- O app foi desenvolvido seguindo as melhores práticas do React Native
- A interface foi projetada para ser intuitiva e acessível
- Todos os dados são armazenados localmente, sem necessidade de backend
- O código está organizado de forma modular e fácil de manter

## 👥 Integrantes

- Eduardo Osorio Filho - RM 550161
- Fabio Hideki Kamikihara - RM 550610

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Desenvolvido para a Global Solution FIAP 2024**  
**Disciplina: Mobile Development & IoT**  
**Tema: O Futuro do Trabalho**

