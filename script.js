function generateImage(inputID, imgContainerID1, resultImgID1) {
    const textInput = document.getElementById(inputID).value;
    const imageContainer1 = document.getElementById(imgContainerID1);
    // const imageContainer2 = document.getElementById(imgContainerID2);
    const generatedImage1 = document.getElementById(resultImgID1);
    // const generatedImage2 = document.getElementById(resultImgID2);

    // Make a POST request to the Hugging Face Inference API
    fetch('https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud', {
        method: 'POST',
        headers: {
            'Accept': 'image/png',
            'Authorization': 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'inputs': textInput
        })
    })
    .then(response => response.blob())
    .then(blob => {
        // Convert the received blob to a data URL
        const imageUrl = URL.createObjectURL(blob);

        // Display the generated image
        generatedImage1.src = imageUrl;
        // generatedImage2.src = imageUrl;
        imageContainer1.style.display = 'block';
        // imageContainer2.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

let generateBtn = document.getElementById('generateBtn');
function dummy(){
    for (let i = 1; i<2; i++){
        let inputID = 'sample';
        let imgContainerID1 = 'samplebox';
        // let imgContainerID2 = 'imgContainer1'+i;
        let resultImgID1 = 'sampleimg';
        // let resultImgID2 = 'imgPanel1'+i;
        generateImage(inputID, imgContainerID1, resultImgID1);
    }
}
