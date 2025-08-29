document.addEventListener('DOMContentLoaded', function () {
    // Acessibilidade
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');

    botaoDeAcessibilidade.addEventListener('click', function (e) {
        e.stopPropagation();
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');
        const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado);
    });

    document.addEventListener('click', function (event) {
        if (!botaoDeAcessibilidade.contains(event.target) && !opcoesDeAcessibilidade.contains(event.target)) {
            opcoesDeAcessibilidade.classList.remove('apresenta-lista');
        }
    });

    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');
    let tamanhoAtualFonte = 1;

    aumentaFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte += 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    });

    diminuiFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte -= 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    });

    alternaContraste.addEventListener('click', function () {
        document.body.classList.toggle('alto-contraste');
    });


    const modal = new bootstrap.Modal(document.getElementById('imagemModal'));
    const modalImg = document.getElementById('imagemModalImg');
    const modalLegenda = document.getElementById('imagemModalLegenda');
    const galleryImages = Array.from(document.querySelectorAll('.img-click'));
    let currentIndex = -1;

    function atualizarLegenda(idx) {
        // Procura a legenda no .image-caption do item da galeria
        const item = galleryImages[idx].closest('.gallery-item');
        if (item) {
            const caption = item.querySelector('.image-caption');
            modalLegenda.textContent = caption ? caption.textContent : '';
        } else {
            modalLegenda.textContent = '';
        }
    }

    galleryImages.forEach(function (img, idx) {
        img.addEventListener('click', function () {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.show();
            currentIndex = idx;
            atualizarLegenda(idx);
        });
    });

    function handleArrowKeys(e) {
        if (modalImg.src === "") return;
        if (e.key === 'ArrowRight') {
            if (currentIndex < galleryImages.length - 1) {
                currentIndex++;
                modalImg.src = galleryImages[currentIndex].src;
                modalImg.alt = galleryImages[currentIndex].alt;
                atualizarLegenda(currentIndex);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                modalImg.src = galleryImages[currentIndex].src;
                modalImg.alt = galleryImages[currentIndex].alt;
                atualizarLegenda(currentIndex);
            }
        }
    }

    document.getElementById('imagemModal').addEventListener('shown.bs.modal', function () {
        document.addEventListener('keydown', handleArrowKeys);
    });

    document.getElementById('imagemModal').addEventListener('hidden.bs.modal', function () {
        document.removeEventListener('keydown', handleArrowKeys);
        modalImg.src = "";
        modalLegenda.textContent = "";
        currentIndex = -1;
    });

    //Modal ampliar imagem
    document.querySelectorAll('.img-click').forEach(function (img) {
        img.addEventListener('click', function () {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.show();
        });
    });

    // ScrollReveal
    ScrollReveal().reveal('#inicio', { delay: 500 });
    ScrollReveal().reveal('#tropicalia', { delay: 500 });
    ScrollReveal().reveal('#galeria', { delay: 500 });
    ScrollReveal().reveal('#contato', { delay: 500 });
});