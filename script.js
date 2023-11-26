// function generateImage(inputID, imgContainerID1, resultImgID1) {
//     const textInput = document.getElementById(inputID).value;
//     const imageContainer1 = document.getElementById(imgContainerID1);
//     // const imageContainer2 = document.getElementById(imgContainerID2);
//     const generatedImage1 = document.getElementById(resultImgID1);
//     // const generatedImage2 = document.getElementById(resultImgID2);

//     // Make a POST request to the Hugging Face Inference API
//     fetch('https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud', {
//         method: 'POST',
//         headers: {
//             'Accept': 'image/png',
//             'Authorization': 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'inputs': textInput
//         })
//     })
//     .then(response => response.blob())
//     .then(blob => {
//         // Convert the received blob to a data URL
//         const imageUrl = URL.createObjectURL(blob);

//         // Display the generated image
//         generatedImage1.src = imageUrl;
//         // generatedImage2.src = imageUrl;
//         imageContainer1.style.display = 'block';
//         // imageContainer2.style.display = 'block';
//     })
//     .catch(error => console.error('Error:', error));
// }

// let generateBtn = document.getElementById('generateBtn');
// function dummy(){
//     for (let i = 1; i<2; i++){
//         let inputID = 'sample';
//         let imgContainerID1 = 'samplebox';
//         // let imgContainerID2 = 'imgContainer1'+i;
//         let resultImgID1 = 'sampleimg';
//         // let resultImgID2 = 'imgPanel1'+i;
//         generateImage(inputID, imgContainerID1, resultImgID1);
//     }
// }




function generateComic(event) {
    event.preventDefault(); // Prevent the form from submitting
    const panels = [];

    // Collect text from input fields
    for (let i = 1; i <= 10; i++) {
        const panelText = document.getElementById(`panel${i}`).value;
        panels.push({ text: panelText });
    }

    console.log(panels, "panels");
    //  Call function to post data to mock API and display images
    postToMockAPI(panels);

    let comicPage = document.getElementById('page2');
    comicPage.classList.remove('d-none');

    let head = document.getElementById('titlename').value;
    let document.getElementById('titlename').textContent = head;

}

function postToMockAPI(panels) {
    async function query(data) {
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: {
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        // Log response status
        console.log("API Response Status:", response.status);

        if (!response.ok) {
            console.error("API request failed:", response.statusText);
            return null;
        }

        const result = await response.blob();

        // Log blob result
        console.log(result, "Blob Result");

        return result;
    }

    console.log("Calling API for each panel...");

    // Loop through each panel and display the generated image
    panels.forEach((panel, index) => {
        const panelId = `imgPanel${index + 11}`;
        const imgContainerId = `imgContainer${index + 11}`;

        // Log panel information
        console.log(`Processing panel ${index + 1} - ${panelId}`);

        // Call the API with panel text
        if (panel.text != ""){
            query({ "inputs": panel.text }).then((response) => {
                if (response) {
                    // Convert the blob to a data URL
                    const imageUrl = URL.createObjectURL(response);

                    // Log image URL
                    console.log(`Image URL for ${panelId}:`, imageUrl);

                    // Display the generated image in the corresponding panel
                    document.getElementById(panelId).src = imageUrl;
                    document.getElementById(imgContainerId).style.display = "block";
                } else {
                    console.warn(`Failed to generate image for ${panelId}`);
                }
            });
        }
    });
}

let resetBtn = document.getElementById('resetBtn');
resetBtn.onclick = function() {
    let comicPage = document.getElementById('page2');
    comicPage.classList.add('d-none');
}

// ... rest of your code




