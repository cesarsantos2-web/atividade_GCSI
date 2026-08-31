Signal & Solder

Landing page conceito para um estúdio boutique de restauração e reparo de sintetizadores modulares vintage. O design usa a estética de bancada de eletrônica e osciloscópio como fio condutor: uma tela de scope animada no topo, indicadores estilo LED, e elementos decorativos inspirados em knobs, jacks e faders reais de um painel modular.

Destaques:

Paleta escura com verde-fósforo (assinatura visual) e dourado latão como acento quente
Tipografia combinando Space Grotesk (display), Source Serif 4 (corpo) e JetBrains Mono (dados/rótulos técnicos)
Seção de processo ("A cadeia de sinal") estruturada como um fluxo real de reparo, do diagnóstico à calibração
Totalmente responsivo, com foco visível no teclado e suporte a prefers-reduced-motion
Construído em HTML e CSS puros, sem dependências além das fontes do Google Fonts

Esse é um site feito para a atividade do professor Fábio

## Configurando o formulário de contato (SCRIPT_URL)

O formulário de contato (seção "Send a signal") não usa banco de dados nem servidor próprio. Ele envia os dados direto para um Google Apps Script Web App, que grava cada envio como uma linha numa planilha do Google Sheets.

Para reaproveitar este projeto com o seu próprio Google Sheets, siga os passos:

1. Crie uma planilha nova no Google Sheets.
2. No menu da planilha, vá em `Extensões > Apps Script`.
3. Cole um script que leia os campos `name`, `instrument`, `symptom` e `email` do `POST` recebido (`e.parameter`) e adicione uma nova linha na planilha com `sheet.appendRow([...])`.
4. Em `Implantar > Nova implantação`, escolha o tipo `App da Web`, defina "Executar como: Eu" e "Quem tem acesso: Qualquer pessoa", e implante.
5. Copie a URL gerada (termina em `/exec`).
6. Abra `script.js` e substitua o valor da constante `SCRIPT_URL` no topo do arquivo pela URL copiada:

   ```js
   var SCRIPT_URL = "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT";
   ```

Enquanto `SCRIPT_URL` não for substituído (ou continuar contendo o texto `COLE_AQUI`), o formulário mostra um aviso de erro ao invés de tentar enviar os dados.

**Atenção:** essa URL fica visível publicamente no `script.js` (é carregada no navegador do usuário), então qualquer pessoa com a URL pode enviar dados para a sua planilha. Para uma atividade escolar isso não é um problema grave, mas não é uma solução recomendada para produção real sem alguma camada extra de proteção (ex: validação no próprio Apps Script, limite de taxa, ou um campo honeypot no formulário).