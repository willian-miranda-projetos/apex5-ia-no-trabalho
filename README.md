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
- `portal.js` controla o menu, a cópia, o checklist e o quiz. Em `questions`, `answer` usa índices iniciados em zero. Atualize a alternativa correta e a explicação sempre que revisar uma pergunta.
- `.nojekyll` permite que o GitHub Pages sirva os arquivos estáticos diretamente.

Mantenha os exemplos fictícios. O quiz e o checklist funcionam no navegador e não enviam respostas.

## Publicar no GitHub Pages

1. Envie os arquivos deste diretório, incluindo `.nojekyll`, para a raiz da branch `main` de um repositório público dedicado ao portal.
2. Em **Settings → Pages**, na seção **Build and deployment**, escolha **Deploy from a branch**. Selecione **main** e **/(root)** e salve.
3. Aguarde a execução de Pages na aba **Actions**. Abra **Visit site** em **Settings → Pages** após a publicação e confira a navegação, o quiz e o botão de cópia.
4. Para atualizar o portal, envie as alterações à mesma branch. Verifique o site quando a nova execução de Pages concluir.

[Documentação do GitHub Pages sobre a origem da publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
