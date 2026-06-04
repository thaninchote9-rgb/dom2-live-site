function makeArchiveCard(item){return `<a class="archiveCard glass" href="${item.url}" target="_blank"><span>${item.date}</span><b>${item.title}</b><em>Открыть выпуск</em></a>`}
function makeNewsCard(item){return `<article class="newsCard glass"><img src="${item.image}" alt="${item.title}"><div><span>${item.date}</span><h3>${item.title}</h3><p>${item.text}</p></div></article>`}
const ap=document.getElementById('archivePreview'); if(ap) ap.innerHTML=archiveItems.slice(0,4).map(makeArchiveCard).join('');
const af=document.getElementById('archiveFull'); if(af) af.innerHTML=archiveItems.map(makeArchiveCard).join('');
const np=document.getElementById('newsPreview'); if(np) np.innerHTML=newsItems.slice(0,2).map(makeNewsCard).join('');
const nf=document.getElementById('newsFull'); if(nf) nf.innerHTML=newsItems.map(makeNewsCard).join('');
