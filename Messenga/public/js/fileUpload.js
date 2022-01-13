$(document).ready(e => {
    $('#file-input').on('change', e=> {

        let list = $('#file-list');

        // For each file element in the change event add a box el to list
        let files = Array.from(e.currentTarget.files);
        
        // If no files return
        if(!files.length) return list.addClass('hide');

        list.removeClass('hide');
        
        updateFileList(e.currentTarget.files)

        console.log(e);
    })

    $('#file-submit').on('click', async e => {
        // Update when sessions are applied
        let postObj = {
            user: 'Jess Boonekamp',
            files: $('#file-input').prop('files')
        }
        await fetch('/sendFiles', {method: 'Post', body: postObj})
    })
})

function generateFileList(fileArr){
    let newList = new DataTransfer();
    fileArr.forEach(f => {
        newList.items.add(f);
    })
    return newList.files;
}

function updateFileList(fileList){

    let files = Array.from(fileList)
    let list = $('#file-list'), boxEls = '';

    list.text('')

    files.forEach(f => {
        let friendlyName = f.name.substring(0, Math.ceil(f.name.length*(.5)))
        boxEls += `<span class="f-box"><div>${friendlyName}</div><i class="fa fa-minus-square-o remove-file" style="color:red"></i></span>`;
    });

    // Append the elements to the file-list
    list.append(boxEls);

    $('.remove-file').on('click', g => {
        const fileInput = document.getElementById('file-input');
        let newFileArray = files.filter(f => !f.name.includes($(g.currentTarget).prev().text()))
        fileInput.files =  generateFileList(newFileArray);
        updateFileList(fileInput.files);
    })
}