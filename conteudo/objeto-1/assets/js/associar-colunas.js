var erro = new Audio("/assets/audio/erro.mp3");
var acerto = new Audio("/assets/audio/acerto.mp3");

$(document).ready(function () {

    $(".resp, .item").click(function () {
        $(this).toggleClass("selecionado");

        if ($(".selecionado").length == 2) {
            var resp1 = $(".selecionado")[0].dataset.resp;
            var resp2 = $(".selecionado")[1].dataset.resp;


            if ($(".selecionado")[0].dataset.resp == $(".selecionado")[1].dataset.resp) {
                $(".selecionado .txtacao").text($(".selecionado")[0].dataset.resp)
            }

            if (resp1 == resp2) {
                $(".selecionado").prop("disabled", true).addClass("acertou");
                $(".selecionado").removeClass("selecionado");

                var question = getQuestionById(resp1);

                if (question) {
                    feedbackPositivo();
                    acerto.play();
                }

            } else {
                $(".selecionado").removeClass("selecionado");

                var question1 = getQuestionById(resp1);
                var question2 = getQuestionById(resp2);

                if (question1 && question2) {
                    feedbackNegativo();
                    erro.play();
                }
            }

            if (verificarTodasAcertadas()) {

                setTimeout(function () {
                    mostrarModalFinal();
                }, 4000);
            }
        }

        function feedbackNegativo() {
            $("#feedback_errado_modal .modal-body p").text(question1.feedbacks.errado + " ");
            $("#feedback_errado_modal").modal("show");
        }

        function feedbackPositivo() {
            $("#feedback_certo_modal .modal-body p").text(question.feedbacks.certo);
            $("#feedback_certo_modal").modal("show");
        }
    });

    function verificarTodasAcertadas() {
        const botoesItem = document.querySelectorAll('.item');
        for (const botao of botoesItem) {
            if (!botao.classList.contains('acertou')) {
                return false;
            }
        }
        return true;
    }

    function mostrarModalFinal() {
        const modal = document.getElementById('feedback_final_modal');
        $(modal).modal('show');
    }

    function randomizeResp(total) {
        let resp = Array.from(document.querySelectorAll('.resp'));
        for (let i = 0; i < total; i++) {
            $(resp).each(function () {
                $(this).insertBefore($(resp[Math.floor(Math.random() * resp.length - 1)]));
            });
        }
    }

    randomizeResp(50);


    var questions = [{
        id: "1",
        feedbacks: {
            certo: "Muito bem! Você acertou! As lentes esféricas centradas têm seu centro geométrico alinhado perfeitamente com o centro óptico, o que ajuda na correção de problemas como miopia e hipermetropia.",
            errado: "Ops! Essa associação está incorreta. Lembre-se que as lentes esféricas centradas têm o centro geométrico alinhado com o centro óptico."
        }
    },
    {
        id: "2",
        feedbacks: {
            certo: "Muito bem! Você acertou! As lentes esféricas descentradas têm o centro geométrico diferente do centro óptico e requerem um alinhamento preciso, observando tanto o posicionamento horizontal quanto o vertical do diâmetro da lente para montagem.",
            errado: "Quase lá! Essa não é a correspondência correta. Lembre-se de que as lentes esféricas descentradas têm o centro geométrico diferente do centro óptico e exigem um alinhamento cuidadoso ao montá-las."
        }
    },
    {
        id: "3",
        feedbacks: {
            certo: "Muito bem! Você acertou! As lentes cilíndricas centradas são usadas para corrigir astigmatismo, e seu centro geométrico coincide com o centro óptico para garantir uma correção precisa.",
            errado: "Ops! Essa associação está incorreta. As lentes cilíndricas centradas são utilizadas para corrigir astigmatismo, e seu centro geométrico coincide com o centro óptico."
        }
    },
    {
        id: "4",
        feedbacks: {
            certo: "Exatamente! Você está se tornando um expert em ótica! As lentes cilíndricas descentradas corrigem astigmatismo e requerem alinhamento horizontal e vertical cuidadoso do diâmetro da lente para montagem.",
            errado: "Ops! Essa associação está incorreta. Lembre-se de que as lentes cilíndricas descentradas são usadas para corrigir astigmatismo e requerem alinhamento horizontal e vertical preciso do diâmetro da lente para montagem."
        }
    },
    {
        id: "5",
        feedbacks: {
            certo: "Incrível! Você está dominando o mundo das lentes prismáticas! Elas são fabricadas com excesso de descentração óptica para corrigir desvios oculares, como estrabismo.",
            errado: "Ops! Essa não é a associação correta. Lembre-se de que as lentes prismáticas são fabricadas com excesso de descentração óptica e são usadas para correções de desvios oculares, como estrabismo."
        }
    },
    {
        id: "6",
        feedbacks: {
            certo: "Corretíssimo! As lentes bifocais são versáteis, atendendo a duas distâncias focais. Sua montagem leva em conta a altura da linha d'água inferior ou limbo até o final da lente para uma visão clara e confortável.",
            errado: "Ops! Essa associação está incorreta. Lembre-se de que as lentes bifocais atendem a duas distâncias focais e a montagem considera a altura da linha d'água inferior ou limbo até o final da lente."
        }
    },
    {
        id: "7",
        feedbacks: {
            certo: "Maravilhoso! Você realmente entende sobre lentes multifocais! Elas atendem diversas distâncias focais através de um corredor progressivo. Na montagem, medidas como DNP e altura pupilar são essenciais para um ajuste perfeito.",
            errado: "Ops! Essa associação está incorreta. Lembre-se de que as lentes multifocais são projetadas para atender a diversas distâncias focais através de um corredor progressivo. Na montagem, medidas como DNP e altura pupilar são levadas em consideração para uma visão nítida."
        }
    }

    ];

    function getQuestionById(id) {
        return questions.find(question => question.id === id);
    }

});