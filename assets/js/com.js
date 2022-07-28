function loadMore() {
    $('#more').show()
    $('.fb-comments-loadmore').hide().remove()
}
$(document).ready(function() {
    $('date').each(function() {
        if ($(this).attr('data-date-minus')) {
            $(this).html(dateMinus($(this).attr('data-date-minus')))
        }
    })
})

function dateMinus(what) {
    var today = Date.now()
    var nw = today - what * 10000
    var newd = new Date()
    newd.setTime(nw)
    var mthName = ['Janeiro', 'Fevereiro', 'MarÃ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    var mthNm = mthName[newd.getMonth()]
    return (newd.getDate() +
        ' de ' +
        mthNm +
        ' de ' +
        newd.getFullYear() +
        ' ' +
        newd.getHours() +
        ':' +
        round(newd.getMinutes()))
}

function round(what) {
    if (what < 10) {
        return '0' + what
    } else {
        return what
    }
}
$('like').on('click', function() {
    if ($(this).hasClass('liked')) {
        $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) - 1)
        $(this).removeClass('liked')
        $(this).text('Curtir')
    } else {
        $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) + 1)
        $(this).addClass('liked')
        $(this).text('Descurtir')
    }
})
$('reply').on('click', function() {
    if (fbobj != null) {
        handleReply($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
    } else {
        logInWithFacebook(handleReply, $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
    }
})

function handleReply(id) {
    var text = ''
    var obj = $('#' + id)
    if (obj.hasClass('fb-comments-reply-wrapper')) {
        text = '@' + obj.find('name').text()
        obj = $('#' + id.split('-')[0])
    }
    obj.find('.row.reply-box').remove()
    obj.append('<div class="row reply-box" id="reply-' +
        obj.attr('id') +
        '"><div class="col-xs-10"><input type="text" value="' +
        text +
        '" placeholder="AÃ±ade una respuesta..." class="fb-reply-input" /></div><div class="col-xs-2"><button class="fb-reply-button" onclick="javascript:postReply(' +
        obj.attr('id') +
        ');">Responder</button></div></div>')
}

function postReply(id) {
    var obj = $('#reply-' + id)
    if (obj && obj.find('.fb-reply-input').val()) {
        var date = new Date()
        var fbreply = {
            forid: id,
            date: date,
            text: obj.find('.fb-reply-input').val()
        }
        fbreplies.push(fbreply)
        var replyc = reply.clone()
        replyc.attr('id', id + '-' + Math.floor(Math.random() * 100 + 10))
        replyc.find('name').text(fbobj.name)
        replyc.find('.fb-comments-comment-img').find('img').attr('src', fbobj.pictureURL)
        replyc.find('.fb-comments-comment-text').text(obj.find('.fb-reply-input').val())
        replyc.find('date').each(function() {
            if ($(this).attr('data-date-minus')) {
                $(this).html(dateMinus($(this).attr('data-date-minus')))
            }
        })
        $('#' + id).after(replyc)
        obj.remove()
        var today = new Date()
        today.setDate(today.getFullYear() + 1)
        setCookie('fbreplies', JSON.stringify(fbreplies), today)
    }
}
setTimeout(function() {
    $('#add-to-cart').show()
}, 20000)
var today = new Date()
today.setDate(today.getFullYear() + 1); 
// setCookie('returningVisitor', 'yes', today);


/* SISTEMA DE NOTIFICAÇÃO */

//Tempo de intervalo, 
var pause = 4000

//Tempo de espera inicial | 1000 = 1 segundo
var wait = 6000
//o tempo final será = pause + wait

//Formas de pagamento
const formas = ['Pix','Cartão'];

//Lista de nomes
const costumers = 
    [
        'Izabella Abreu Alcaide, RJ',
        'Luiz Felipe Souza, MG',
        'Alana Sales, SP',
        'Caroline Martins, RS',
        'Catarina Pires, BH',
        'Maria Cecília Pereira, PR',
        'Vicente Pereira, SP',
        'Eduardo Rodrigues, Próximo a você',
        'Maitê Monteiro, MG',
        'João Guilherme Moreira, SC',
        'Maria Sophia Gonçalves, SP',
        'Thales Aragão, PB',
        'Caroline Martins, CE',
        'Ana Luiza da Costa, Próxima a você',
        'Bianca Azevedo, DF',
        'Enzo Ramos, AM',
        'Calebe Dias, RJ',
        'João Miguel da Cruz, MG',
        'Alexia Melo, Próxima a você, AM',
        'Samuel Vieira, CE'
    ];


const box = document.getElementsByClassName('box-notification')[0]
var open = true;

const notification = () => {
    let numberForma = Math.floor(Math.random() * formas.length);
    let lastCostumer = costumers.at(-1);
    let name = document.getElementById('name-notification');
    let formaCompra = document.getElementById('forma-compra');

    if(lastCostumer !== undefined){ 
        formaCompra.innerText = formas[numberForma];
        name.innerText = lastCostumer;
        costumers.pop(lastCostumer);
    }else{
        open = false;
    }
}


var dataLocal =  localStorage.getItem("alreadyElsDisplayed"); 
function startNotification(){
    setTimeout(() => {
         if(dataLocal == null){
            setInterval(() => {
                if(open){
                    notification()
                    console.log(wait)
                    if(!box.classList.contains('on')){
                        box.classList.add('on')
                    }
                }else{
                    if(box.classList.contains('on')){
                        box.classList.remove('on')
                    }
                }
        
            }, pause); 
        }
    }, wait);

}
