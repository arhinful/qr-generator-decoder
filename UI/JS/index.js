
const pyshell = require('python-shell')
const swall = require('sweetalert')


$(function () {

    $('#generate').click(()=>{

        let text = $('#text').val()

        if (text.length < 1 || text === '' || text === null){
            swall('Error', 'Text is required', 'error')
            return
        }
        let data = {
            'text': text
        }

        //options for sending data
        let options = {
            mode: 'text',
            encoding: 'utf8',
            pythonOptions: ['-u'],
            scriptPath: 'C:\\Users\\Fii\\Desktop\\qr decoder\\BACKEND',
            pythonPath: 'C:\\Users\\Fii\\AppData\\Local\\Programs\\Python\\Python37\\python.exe',
            args: [JSON.stringify(data)],
        }

        let sendData = new pyshell('generate_qr.py', options)

        sendData.on('message', message=> {
            let result = JSON.parse(message)
            if (result['success'] === '1'){
                $('#qr_img').prop('src', 'data:image/png;base64,'+result['image'])
                swall('Success', 'QR Code generated successfully', 'success')
            }
            else {
                swall('Error', 'An error occurred, please try again', 'error')
            }
        })

        //log error if exist
            sendData.end(function (err) {
            if (err) throw err;
        })

    })

    $('#contact').click(()=>{
        let cont = '<div> hello </div>'
        swall('Info', ' Phone: +233542092800--------Email: kofibusy@gmail.com--------FB: Enfa Meho')
    })

    $('#decode').click(()=>{
        $('#home').slideUp()
        $('#decode-page').slideDown()
        $('#back').slideDown()
    })

    $('#back').click(()=>{
        $('#decode-page').slideUp()
        $('#back').slideUp()
        $('#home').slideDown()
    })

    $('#start-cam').click(()=>{

        let data = {
            'start': 'true'
        }

        //options for sending data
        let options = {
            mode: 'text',
            encoding: 'utf8',
            pythonOptions: ['-u'],
            scriptPath: 'C:\\Users\\Fii\\Desktop\\qr decoder\\BACKEND',
            pythonPath: 'C:\\Users\\Fii\\AppData\\Local\\Programs\\Python\\Python37\\python.exe',
            args: [JSON.stringify(data)],
        }

        let sendData = new pyshell('decode_qr.py', options)

        sendData.on('message', message=> {
            let result = JSON.parse(message)
            console.log(result)
            let text = result['text']
            let _type = result['_type']
            let rect = result['rect']

            swall('success', 'QR Code Decoded successfully', 'success')

            $('#text-value').html(text)
            $('#_type-value').html(_type)
            $('#rect-left-value').html(rect['left'])
            $('#rect-top-value').html(rect['top'])
            $('#rect-width-value').html(rect['width'])
            $('#rect-height-value').html(rect['height'])

            console.log(text)
        })

        //log error if exist
            sendData.end(function (err) {
            if (err) throw err;
        })


    })

})