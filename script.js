const USER='sarveshsantoshmhatre';
const $=s=>document.querySelector(s);
$('#year').textContent=new Date().getFullYear();

function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function tags(repo){const lang=repo.language?[repo.language]:[]; const words=(repo.description||'').match(/\b(React|Next\.js|TypeScript|Python|JavaScript|Supabase|PostgreSQL|Docker|Linux|DevOps|API|ML|AI|Computer Vision)\b/gi)||[]; return [...new Set([...lang,...words])].slice(0,4)}
function card(repo,i){const t=tags(repo); return `<article class="project"><span class="project-num">${String(i+1).padStart(2,'0')} / ${repo.private?'private':'public'}</span><h3>${esc(repo.name)}</h3><p>${esc(repo.description||'A software project by Sarvesh Santosh Mhatre.')}</p><div class="tags">${(t.length?t:['GitHub']).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><a class="project-link" href="${repo.html_url}" target="_blank" rel="noreferrer">View repository ↗</a></article>`}

async function load(){
 try{
  const [profileRes,reposRes]=await Promise.all([
   fetch(`https://api.github.com/users/${USER}`),
   fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`)
  ]);
  if(!profileRes.ok||!reposRes.ok) throw new Error('GitHub API unavailable');
  const p=await profileRes.json(); const repos=await reposRes.json();
  const publicRepos=repos.filter(r=>!r.fork&&!r.archived);
  $('#repoCount').textContent=p.public_repos;
  $('#followers').textContent=p.followers;
  $('#stars').textContent=publicRepos.reduce((n,r)=>n+r.stargazers_count,0);
  const featured=publicRepos.slice(0,6);
  $('#projects').innerHTML=featured.map(card).join('') || '<div class="loading">No public projects found.</div>';
 }catch(e){
  $('#projects').innerHTML='<div class="loading">GitHub data could not be loaded right now. <a href="https://github.com/sarveshsantoshmhatre" target="_blank" rel="noreferrer">Open GitHub profile ↗</a></div>';
 }
}
load();
