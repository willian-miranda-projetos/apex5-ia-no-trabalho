# IA no Trabalho · APEX V

Portal estático de extensão universitária da Unyleya, em português brasileiro, para profissionais administrativos do Estaleiro Mauá. Usa HTML, CSS e JavaScript sem dependências de execução.

## Abrir localmente

Abra `index.html` no navegador, mantendo os arquivos na mesma pasta. Para testar no modo HTTP, execute na raiz do projeto:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abra [localhost:8000](http://localhost:8000). O botão de cópia usa a área de transferência quando disponível e oferece seleção do texto como alternativa.

## Manutenção

- `index.html` contém as seções, os exemplos, o modelo e as referências. Ao mudar IDs de seções, atualize também os links de navegação.
- `estilos.css` contém a identidade visual, os layouts responsivos e as regras de foco.
- `portal.js` controla o menu, a cópia, o checklist, o quiz e a exibição dos links opcionais. Em `questions`, `answer` usa índices iniciados em zero. Atualize a alternativa correta e a explicação sempre que revisar uma pergunta.
- `.nojekyll` permite que o GitHub Pages sirva os arquivos estáticos diretamente.

Mantenha os exemplos fictícios. O quiz e o checklist funcionam no navegador e não enviam respostas.

Ao publicar mudanças em `estilos.css` ou `portal.js`, atualize também o número `v` no endereço do arquivo correspondente em `index.html`. Isso evita que o navegador reutilize uma versão antiga em cache.

## Ativar a avaliação

1. Crie um formulário voluntário no Google Forms ou no Microsoft Forms. Permita respostas sem login, desative a coleta de e-mails e dispense nome, empresa, cargo, matrícula ou qualquer outro identificador. Na pergunta aberta, peça que não sejam incluídos dados pessoais ou confidenciais.
2. Copie o endereço HTTPS **de resposta dos participantes**. Em `portal.js`, no objeto `linksOpcionais`, cole esse endereço entre as aspas de `avaliacao`.
3. Abra o formulário em uma janela anônima e confirme que é possível enviar uma resposta sem identificação. Publique a alteração e teste o botão **Avaliar o material** no portal. Com o campo vazio ou malformado, o botão fica oculto e o portal informa que a avaliação será disponibilizada posteriormente.

### Questionário sugerido

Para as perguntas 1 a 5, use uma escala de 1 a 5. Apresente os rótulos **1 = De modo algum**, **2 = Pouco**, **3 = Em parte**, **4 = Bastante** e **5 = Totalmente**.

1. O conteúdo do portal foi claro e fácil de compreender?
2. Os exemplos apresentados foram úteis para sua rotina profissional?
3. Você compreendeu melhor como elaborar prompts?
4. As orientações ajudaram a reconhecer limitações e riscos da IA?
5. Você pretende aplicar as boas práticas apresentadas?
6. Que melhoria você sugere para o material? Use um campo de texto opcional.

As respostas ficam no serviço de formulário que você configurar. O portal não as recebe nem armazena.

## Disponibilizar a apresentação

1. Adicione o PowerPoint ou PDF autorizado ao repositório, por exemplo em `materiais/`. Se preferir hospedar o arquivo externamente, use um endereço HTTPS acessível aos participantes.
2. No mesmo objeto `linksOpcionais`, preencha `apresentacao` com o caminho a partir da raiz do portal, por exemplo `./materiais/apresentacao.pdf`, ou com o endereço HTTPS. Preserve o prefixo `./` nos caminhos do repositório para funcionar no subdiretório do GitHub Pages.
3. Publique a alteração e abra o botão **Acessar apresentação** para conferir se o arquivo abre ou baixa. Com o campo vazio ou malformado, o bloco fica oculto.

## Publicar no GitHub Pages

1. Envie os arquivos deste diretório, incluindo `.nojekyll`, para a raiz da branch `main` de um repositório público dedicado ao portal.
2. Em **Settings → Pages**, na seção **Build and deployment**, escolha **Deploy from a branch**. Selecione **main** e **/(root)** e salve.
3. Aguarde a execução de Pages na aba **Actions**. Abra **Visit site** em **Settings → Pages** após a publicação e confira a navegação, o quiz e o botão de cópia.
4. Para atualizar o portal, envie as alterações à mesma branch. Verifique o site quando a nova execução de Pages concluir.

[Documentação do GitHub Pages sobre a origem da publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
