const upload = document.getElementById("pdfUpload");

upload.addEventListener("change", async function() {

const file = upload.files[0];
if (!file) return;

const reader = new FileReader();

reader.onload = async function() {

const typedarray = new Uint8Array(this.result);

const pdf = await pdfjsLib.getDocument(typedarray).promise;

let fullText = "";

for (let i = 1; i <= pdf.numPages; i++) {

const page = await pdf.getPage(i);
const textContent = await page.getTextContent();

textContent.items.forEach(item => {
fullText += item.str + " ";
});

}

const words = fullText.trim().split(/\s+/);
const characters = fullText.length;

document.getElementById("words").innerText = words.length;
document.getElementById("characters").innerText = characters;
document.getElementById("pages").innerText = pdf.numPages;

};

reader.readAsArrayBuffer(file);

});
