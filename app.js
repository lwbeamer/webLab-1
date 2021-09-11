$(function (){

    let numValueX = undefined
    let numValueY= undefined
    let numValueR = undefined

    function isNumber(s){
        if (s === 0) return true;
        return (!isNaN(parseFloat(s)) && s);
    }

    function checkX(){
        const X_MIN = -3;
        const X_MAX = 3;
        let value = $('#x-textinput').val();
        let fieldValueX = value.trim();
        fieldValueX = value.replace(',', '.');
        numValueX = parseFloat(fieldValueX)
        if (numValueX === +fieldValueX && isNumber(numValueX)){
            if (numValueX>X_MIN && numValueX<X_MAX){
                $('#x-textinput').removeClass('text-error')
                return true;
            } else{
                $('#x-textinput').addClass('text-error')
                return false;
            }
        } else{
            $('#x-textinput').addClass('text-error')
            return false;
        }
    }
    function checkY(){
        if (numValueY === undefined){
            $('.y-buttons input').addClass('button-error')
            $('.y-buttons input').removeClass('button-clicked')
            return false;
        } else {
            $('.y-buttons input').removeClass('button-error')
            return true;
        }
    }

    $('.y-buttons input').click(function (){
       numValueY = $(this).val();
       $('.y-buttons input').removeClass('button-clicked')
       $(this).addClass('button-clicked')
    });

    $('.r-checkbox').click(function (){
        let id = $(this).attr('id');
        $('.r-checkbox').prop('checked',false)
        $('#'+id).prop('checked',true)
    });


    function checkR(){
        if ($('.r-checkbox').is(':checked')){
            if ($('#r-checkbox1').is(':checked')) numValueR= $('#r-checkbox1').val();
            if ($('#r-checkbox2').is(':checked')) numValueR= $('#r-checkbox2').val();
            if ($('#r-checkbox3').is(':checked')) numValueR= $('#r-checkbox3').val();
            if ($('#r-checkbox4').is(':checked')) numValueR= $('#r-checkbox4').val();
            if ($('#r-checkbox5').is(':checked')) numValueR= $('#r-checkbox5').val();
            $('.rbox-label').removeClass('checkbox-error')
            return true;
        } else {
            $('.rbox-label').addClass('checkbox-error')
            return false;
        }
    }

    $('#input-form').on('submit', function(event){
        event.preventDefault();
        if(!(checkX() & checkY() & checkR())) return;
        $.ajax({
            url: 'main.php',
            type: 'POST',
            dataType: 'json',
            data: {
                x: numValueX,
                r: numValueR,
                y: numValueY,
                time: new Date().getTimezoneOffset()
            },
            beforeSend: function () {
                $('.sub-res-buttons input').attr('disabled', 'disabled');
            },
            success: function(data){
                $('.sub-res-buttons input').attr('disabled', false);
                if (data.isValid) {
                let newRow = '<tr>';
                newRow += '<td>' + data.x + '</td>>';
                newRow += '<td>' + data.y + '</td>>';
                newRow += '<td>' + data.r + '</td>>';
                newRow += '<td>' + data.currentTime + '</td>>';
                newRow += '<td>' + data.execTime + '</td>>';
                newRow += '<td>' + data.result + '</td>>';
                $('#result-content-table').append(newRow);
                }
            }
        });
    });

    $('#input-form').on('reset', function(event){
        numValueX = undefined;
        numValueY = undefined;
        numValueR = undefined;
        $('#x-textinput').removeClass('text-error')
        $('.y-buttons input').removeClass('button-error')
        $('.rbox-label').removeClass('checkbox-error')
        $('.y-buttons input').removeClass('button-clicked')
    });


});





