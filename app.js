var REG_URL = 'https://script.google.com/macros/s/AKfycbxCXToB7eu_yq8T6v0mwWOtoNV5dBe4cXr7WaQq-TO9ACaPNcowYtIAVcJkW_GOiA5Myg/exec';
var REG_KEY = 'I01a1kfzUSBSUKdVgdLgx';
var LOGO = 'img/logo.png';

var L='абвгде';
/* список автоколонн зашит в код; чтобы изменить, правьте этот массив */
var COLS=[
  'Автотранспортное подразделение, Автоколонна №1',
  'Автотранспортное подразделение, Автоколонна №2',
  'Автотранспортное подразделение, Автоколонна №3',
  'Автотранспортное подразделение, Автоколонна №4',
  'Автотранспортное подразделение, Автоколонна №5',
  'Автотранспортное подразделение, Автоколонна №6',
  'Автотранспортное подразделение, Автоколонна №7',
  'Автотранспортное подразделение, Автоколонна №8',
  'Автотранспортное подразделение, Автоколонна №9',
  'Автотранспортное подразделение, Автоколонна №10',
  'Автотранспортное подразделение, Автоколонна №11',
  'Автотранспортное подразделение, Автоколонна №12',
  'Автотранспортное подразделение, Автоколонна №13',
  'Автотранспортное подразделение, Автоколонна №14',
  'Автотранспортное подразделение, Автоколонна №15',
  'Автотранспортное подразделение, Автоколонна №16',
  'Автотранспортное подразделение, Автоколонна №17',
  'Автотранспортное подразделение, Автоколонна №18',
  'Автотранспортное подразделение, Автоколонна №19',
  'Автотранспортное подразделение, Автоколонна №20',
  'Автотранспортное подразделение, Автоколонна №21',
  'Автотранспортное подразделение, Автоколонна №22',
  'Автотранспортное подразделение, Автоколонна №23',
  'Автотранспортное подразделение, Автоколонна №24',
  'Автотранспортное подразделение, Автоколонна №25',
  'Автотранспортное подразделение, Автоколонна №26',
  'Автотранспортное подразделение, Автоколонна №27',
  'Автотранспортное подразделение, Автоколонна №28',
  'Автотранспортное подразделение, Автоколонна №29',
  'Автотранспортное подразделение, Автоколонна №30',
  'Автотранспортное подразделение, Автоколонна №31',
  'Автотранспортное подразделение, Автоколонна №32',
  'Автотранспортное подразделение, Автоколонна №33',
  'Автотранспортное подразделение, Автоколонна №34',
  'Автотранспортное подразделение, Автоколонна №35',
  'Автотранспортное подразделение, Автоколонна №36'
];
var LS='iteco_bdd_cfg_v1';
var CFG={columns:[],members:[],url:REG_URL,key:REG_KEY,lastCol:''};
for(var mi=0;mi<5;mi++)CFG.members.push({n:'',p:''});
var S={};
function $(id){return document.getElementById(id)}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
function pad(n){return (n<10?'0':'')+n}
function fmtDate(iso){var p=iso.split('-');return p[2]+'.'+p[1]+'.'+p[0]}
function fmtTime(d){return pad(d.getHours())+':'+pad(d.getMinutes())}
function show(id){['s-start','s-set','s-test','s-res','s-reg'].forEach(function(x){$(x).classList.toggle('hidden',x!==id)});window.scrollTo(0,0)}
function clean(s){return String(s==null?'':s).replace(/\s+/g,' ').trim()}
function b64e(t){return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g,function(m,h){return String.fromCharCode(parseInt(h,16))})).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function b64d(x){x=x.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';return decodeURIComponent(atob(x).split('').map(function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
/* ---------- удалённый режим: #t=... в ссылке ---------- */
var PRE=(window.PRESET&&Array.isArray(window.PRESET.columns)&&Array.isArray(window.PRESET.members))?window.PRESET:null;
var REMOTE=null,REMOTE_BAD=false;
(function(){
  var sh=/^#c=(\d+)-([\d.]+)-(\d+)-(\d+)$/.exec(location.hash);
  if(sh){
    if(!PRE){REMOTE_BAD=true;return}
    var u=COLS[+sh[1]],ms=sh[2].split('.').map(function(i){return PRE.members[+i]}).filter(function(x){return x&&x.n});
    if(!u||!ms.length){REMOTE_BAD=true;return}
    REMOTE={u:u,m:ms,e:+sh[3],t:+sh[4]};return;
  }
  var m=/^#t=(.+)$/.exec(location.hash);if(!m)return;
  try{var o=JSON.parse(b64d(m[1]));if(!o||!o.u||!Array.isArray(o.m)||!o.m.length)throw 0;REMOTE=o}catch(e){REMOTE_BAD=true}
})();
function applyRemote(){
  document.body.classList.add('remote');
  CFG.columns=[REMOTE.u];CFG.lastCol=REMOTE.u;CFG.members=[];
  for(var i=0;i<5;i++){var x=REMOTE.m[i]||{};CFG.members.push({n:clean(x.n),p:clean(x.p)})}
}
function afterRemote(){
  $('unit').value=REMOTE.u;$('tk').value=String(REMOTE.t||0);$('maxerr').value=REMOTE.e;
  document.querySelector('#s-start .sub').textContent='Подразделение: '+REMOTE.u;
}
function remoteDone(ok,wrong,n){
  var q=S.t.q,p=$('proto');p.innerHTML='';
  p.appendChild(el('h2',null,'Тест завершён'));
  p.appendChild(el('div','sub2',S.fio+' · '+S.unit+' · Билет № '+S.t.n));
  p.appendChild(el('div','res '+(ok?'ok':'no'),ok?'РЕЗУЛЬТАТ: ЗАЧЁТ':'РЕЗУЛЬТАТ: НЕЗАЧЁТ'));
  p.appendChild(el('p',null,'Правильных ответов: '+(n-wrong)+' из '+n+'. Допустимо ошибок: '+S.maxerr+'.'));
  p.appendChild(el('h4',null,'Разбор ответов'));
  q.forEach(function(x,i){
    var a=S.ans[i],good=a===x.a,b=el('div','rv '+(good?'good':'bad'));
    b.appendChild(el('div','rvq',(i+1)+'. '+x.t));
    (x.i||[]).forEach(function(id){if(IMGS[id]){var im=document.createElement('img');im.src=IMGS[id];im.alt='';b.appendChild(im)}});
    b.appendChild(el('div','rva',(good?'✓ Верно: ':'✗ Ваш ответ: ')+(a<0?'нет ответа':L[a]+') '+x.o[a])));
    if(!good)b.appendChild(el('div','rvc','Правильный ответ: '+L[x.a]+') '+x.o[x.a]));
    p.appendChild(b);
  });
}

/* ---------- настройки ---------- */
function applyCfg(o){
  if(!o||typeof o!=='object')return;
  CFG.columns=COLS.slice(); /* список колонн всегда берётся из кода */
  if(Array.isArray(o.members)){for(var i=0;i<5;i++){var m=o.members[i]||{};CFG.members[i]={n:clean(m.n),p:clean(m.p)}}}
  CFG.url=REG_URL;CFG.key=REG_KEY; /* адрес и ключ всегда берутся из файла, сохранённые в браузере игнорируются */
  if(typeof o.lastCol==='string')CFG.lastCol=o.lastCol;
}
function loadCfg(){try{var r=localStorage.getItem(LS);if(r)applyCfg(JSON.parse(r))}catch(e){}}
function saveCfg(){if(REMOTE)return true;try{localStorage.setItem(LS,JSON.stringify(CFG));return true}catch(e){return false}}
function members(){return CFG.members.map(function(m,i){return {i:i,n:m.n,p:m.p}}).filter(function(m){return m.n})}

function refreshStart(){
  var sel=$('unit');sel.innerHTML='';
  var o0=document.createElement('option');o0.value='';o0.textContent=CFG.columns.length?'— выберите —':'— сначала добавьте в «Настройках» —';sel.appendChild(o0);
  CFG.columns.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o)});
  if(CFG.lastCol&&CFG.columns.indexOf(CFG.lastCol)>=0)sel.value=CFG.lastCol;
  var box=$('comm');box.innerHTML='';
  var ms=members();
  if(!ms.length){box.appendChild(el('div','hint','Состав комиссии не задан. Откройте «Настройки» и впишите членов комиссии.'))}
  ms.forEach(function(m){
    var lab=el('label','chk');var cb=document.createElement('input');cb.type='checkbox';cb.checked=true;cb.value=m.i;
    lab.appendChild(cb);lab.appendChild(el('span',null,m.n+(m.p?' — '+m.p:'')));box.appendChild(lab);
  });
  $('reg-info').textContent=CFG.url?'Результаты проверки будут отправлены в реестр.':'Реестр не подключён: результат остаётся только в протоколе (подключается в «Настройках»).';
}
function fillSettings(){
  $('set-cols').value=CFG.columns.join('\n');
  var box=$('set-members');box.innerHTML='';
  for(var i=0;i<5;i++){
    var r=el('div','mrow');r.appendChild(el('span',null,String(i+1)));
    var a=document.createElement('input');a.type='text';a.id='m-n'+i;a.placeholder='ФИО';a.value=CFG.members[i].n;
    var b=document.createElement('input');b.type='text';b.id='m-p'+i;b.placeholder='Должность';b.value=CFG.members[i].p;
    r.appendChild(a);r.appendChild(b);box.appendChild(r);
  }
  $('set-url').value=CFG.url;$('set-key').value=CFG.key;$('set-url').readOnly=true;$('set-key').readOnly=true;
  $('e-set').textContent='';$('m-set').textContent='';
}
function readSettingsForm(){
  var o={columns:$('set-cols').value.split('\n'),members:[],url:$('set-url').value,key:$('set-key').value,lastCol:CFG.lastCol};
  for(var i=0;i<5;i++)o.members.push({n:$('m-n'+i).value,p:$('m-p'+i).value});
  return o;
}
$('b-settings').onclick=function(){fillSettings();show('s-set')};
$('b-cancel').onclick=function(){refreshStart();show('s-start')};
$('b-save').onclick=function(){
  applyCfg(readSettingsForm());
  if(CFG.url&&!/^https:\/\/script\.google\.com\/.+\/exec$/.test(CFG.url)){$('e-set').textContent='Адрес реестра выглядит неверно: он должен начинаться с https://script.google.com/ и оканчиваться на /exec.';return}
  if(saveCfg()){refreshStart();show('s-start')}
  else{$('e-set').textContent='Браузер не разрешил сохранить настройки. Они действуют до закрытия страницы; для переноса используйте «Показать настройки».';refreshStart()}
};
$('b-exp').onclick=function(){applyCfg(readSettingsForm());$('set-json').value=JSON.stringify({columns:CFG.columns,members:CFG.members,url:CFG.url,key:CFG.key});$('set-json').select()};
$('b-cfgjs').onclick=function(){
  applyCfg(readSettingsForm());
  $('set-json').value='var PRESET='+JSON.stringify({columns:CFG.columns,members:CFG.members})+';';
  $('set-json').select();
  $('m-set').textContent='Скопируйте весь этот текст и сохраните его в репозитории GitHub как файл config.js рядом с index.html. После этого ссылки для водителей станут короткими.';
};
$('b-imp').onclick=function(){
  try{applyCfg(JSON.parse($('set-json').value));fillSettings();$('m-set').textContent='Загружено. Нажмите «Сохранить», чтобы применить.'}
  catch(e){$('e-set').textContent='Не удалось прочитать текст настроек.'}
};

/* ---------- старт теста ---------- */
(function init(){
  var d=new Date();
  $('dt').value=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  $('qcnt').textContent=DATA[0].q.length;
  DATA.forEach(function(t){var o=document.createElement('option');o.value=t.n;o.textContent='Билет №'+t.n;$('tk').appendChild(o)});
  loadCfg();
  if(PRE){CFG.columns=PRE.columns.slice();CFG.members=[];for(var pi=0;pi<5;pi++){var pm=PRE.members[pi]||{};CFG.members.push({n:clean(pm.n),p:clean(pm.p)})}}
  CFG.columns=COLS.slice();
  if(REMOTE)applyRemote();
  refreshStart();
  if(REMOTE)afterRemote();
  if(REMOTE_BAD){$('e-start').textContent='Ссылка повреждена. Запросите новую у инспектора.';$('b-start').disabled=true}
})();

/* ---------- ссылка для удалённой проверки ---------- */
$('b-link').onclick=function(){
  var unit=$('unit').value,comm=[];
  Array.prototype.forEach.call($('comm').querySelectorAll('input:checked'),function(cb){var m=CFG.members[parseInt(cb.value,10)];comm.push({n:m.n,p:m.p})});
  if(!unit){$('e-start').textContent='Для ссылки выберите автоколонну.';return}
  if(!comm.length){$('e-start').textContent='Для ссылки отметьте хотя бы одного члена комиссии.';return}
  $('e-start').textContent='';
  var me=parseInt($('maxerr').value,10);if(isNaN(me)||me<0)me=0;
  var o={u:unit,m:comm,e:me,t:parseInt($('tk').value,10)||0};
  var base=location.href.split('#')[0],ui=PRE?COLS.indexOf(unit):-1,mi=[];
  if(PRE)Array.prototype.forEach.call($('comm').querySelectorAll('input:checked'),function(cb){mi.push(cb.value)});
  $('lnk').value=(PRE&&ui>=0)?base+'#c='+ui+'-'+mi.join('.')+'-'+me+'-'+o.t:base+'#t='+b64e(JSON.stringify(o));
  $('lnk-box').classList.remove('hidden');
  if(location.protocol==='file:')$('lnk-hint').textContent='Внимание: страница открыта как локальный файл, такая ссылка заработает только у вас. Сначала разместите страницу на хостинге и откройте её по https-адресу.';
};
$('b-copy').onclick=function(){
  var i=$('lnk');i.select();
  try{if(navigator.clipboard)navigator.clipboard.writeText(i.value);else document.execCommand('copy')}catch(e){}
  $('b-copy').textContent='Скопировано';setTimeout(function(){$('b-copy').textContent='Копировать'},1500);
};

$('b-start').onclick=function(){
  var unit=$('unit').value;
  var fio=clean($('fio').value);
  var dt=$('dt').value;
  var comm=[];Array.prototype.forEach.call($('comm').querySelectorAll('input:checked'),function(cb){var m=CFG.members[parseInt(cb.value,10)];comm.push({n:m.n,p:m.p})});
  if(!unit){$('e-start').textContent='Выберите автоколонну / подразделение (список настраивается в «Настройках»).';return}
  if(fio.split(' ').length<2){$('e-start').textContent='Введите ФИО полностью (фамилия и имя).';$('fio').focus();return}
  if(!dt){$('e-start').textContent='Укажите дату тестирования.';return}
  if(!comm.length){$('e-start').textContent='Отметьте хотя бы одного члена комиссии (состав задаётся в «Настройках»).';return}
  var me=parseInt($('maxerr').value,10); if(isNaN(me)||me<0)me=0;
  var sel=parseInt($('tk').value,10);
  var t=sel?DATA.filter(function(x){return x.n===sel})[0]:DATA[Math.floor(Math.random()*DATA.length)];
  CFG.lastCol=unit;saveCfg();
  S={unit:unit,fio:fio,dt:dt,comm:comm,maxerr:me,t:t,ans:new Array(t.q.length).fill(-1),cur:0,start:new Date(),end:null};
  $('e-start').textContent='';
  $('t-who').textContent=fio;$('t-tk').textContent='Билет №'+t.n;
  buildDots();render();show('s-test');
  window.onbeforeunload=function(e){e.preventDefault();e.returnValue='';return ''};
};
function buildDots(){
  var c=$('dots');c.innerHTML='';
  S.t.q.forEach(function(_,i){var b=el('button','dot',String(i+1));b.onclick=function(){S.cur=i;render()};c.appendChild(b)});
}
function render(){
  var q=S.t.q[S.cur],n=S.t.q.length;
  $('t-num').textContent='Вопрос '+(S.cur+1)+' из '+n;
  var done=S.ans.filter(function(a){return a>=0}).length;
  $('t-cnt').textContent='Отвечено: '+done+' из '+n;
  $('bar').style.width=(done/n*100)+'%';
  $('q-text').textContent=q.t;
  var im=$('q-imgs');im.innerHTML='';
  q.i.forEach(function(id){var i=document.createElement('img');i.src=IMGS[id];i.className='qimg';i.alt='Рисунок к вопросу';im.appendChild(i)});
  var o=$('q-opts');o.innerHTML='';
  q.o.forEach(function(txt,k){
    var b=el('button','opt'+(S.ans[S.cur]===k?' sel':''));
    b.appendChild(el('b',null,L[k]+')'));b.appendChild(el('span',null,txt));
    b.onclick=function(){S.ans[S.cur]=k;render()};
    o.appendChild(b);
  });
  $('b-prev').disabled=S.cur===0;
  var last=S.cur===n-1;
  $('b-next').textContent=last?'Завершить тест ✓':'Далее →';
  Array.prototype.forEach.call($('dots').children,function(d,i){d.className='dot'+(S.ans[i]>=0?' done':'')+(i===S.cur?' cur':'')});
}
$('b-prev').onclick=function(){if(S.cur>0){S.cur--;render()}};
$('b-next').onclick=function(){
  if(S.cur<S.t.q.length-1){S.cur++;render();return}
  var left=S.ans.filter(function(a){return a<0}).length;
  var msg=left?('Есть вопросы без ответа: '+left+'. Они будут засчитаны как ошибки. Завершить тест?'):'Завершить тест и сформировать протокол?';
  if(confirm(msg))finish();
};

/* ---------- результат, протокол, реестр ---------- */
function commText(){return S.comm.map(function(m){return m.n+(m.p?' ('+m.p+')':'')}).join('; ')}
var PK='iteco_bdd_pending_v1';
function pendGet(){try{return JSON.parse(localStorage.getItem(PK)||'[]')}catch(e){return[]}}
function pendSet(a){try{localStorage.setItem(PK,JSON.stringify(a))}catch(e){}}
function pendDel(id){pendSet(pendGet().filter(function(x){return x.id!==id}))}
var LASTERR='';
function postOne(p){
  var body=JSON.stringify(p);
  return fetch(CFG.url,{method:'POST',mode:'no-cors',redirect:'follow',credentials:'omit',headers:{'Content-Type':'text/plain;charset=utf-8'},body:body}).catch(function(err){
    LASTERR=(err&&(err.name+': '+err.message))||String(err);
    if(navigator.sendBeacon&&navigator.sendBeacon(CFG.url,new Blob([body],{type:'text/plain;charset=utf-8'})))return;
    throw err;
  });
}
function flushPending(){
  if(!CFG.url)return;
  pendGet().forEach(function(it){postOne(it.p).then(function(){pendDel(it.id)}).catch(function(){})});
}
window.addEventListener('online',flushPending);
function sendToRegistry(payload){
  var st=$('reg-status');
  if(!CFG.url){st.textContent=REMOTE?'':'Реестр не подключён: результат остаётся только в протоколе.';return}
  payload.key=CFG.key;
  var id=Date.now()+'-'+Math.random().toString(36).slice(2),n=0;
  pendSet(pendGet().concat([{id:id,p:payload}]));
  st.textContent='Отправка результата…';
  (function go(){
    postOne(payload).then(function(){
      pendDel(id);
      st.textContent=REMOTE?'Результат передан инспектору.':'Результат отправлен в реестр. Проверьте, что строка появилась в таблице.';
    }).catch(function(){
      if(++n<4){setTimeout(go,3000*n);return}
      st.textContent=(LASTERR?'['+LASTERR+'] ':'')+'Нет связи. Результат сохранён на этом устройстве и отправится автоматически, когда вы снова откроете страницу с интернетом.'+(REMOTE?'':' Распечатайте протокол.');
      st.style.color='#b3261e';
    });
  })();
}
function renderProtocol(M){
  var q=M.t.q,wrong=0;
  q.forEach(function(x,i){if(M.ans[i]!==x.a)wrong++});
  var ok=wrong<=M.maxerr;
  var p=$('proto');p.innerHTML='';
  var phd=el('div','phead'),psp=document.createElement('img'),pmid=el('div','mid'),plg=document.createElement('img');
  psp.src=plg.src=LOGO;psp.alt='';psp.className='lg sp';plg.alt='ITECO';plg.className='lg';
  pmid.appendChild(el('h2',null,'Протокол проверки знаний по БДД'));
  pmid.appendChild(el('div','sub2','ITECO · Отдел по Безопасности Дорожного Движения · Экзаменационные билеты'));
  phd.appendChild(psp);phd.appendChild(pmid);phd.appendChild(plg);p.appendChild(phd);
  var info=el('table','info');
  var rows=[[['Автоколонна / подразделение',M.unit]],[['Тестируемый (ФИО)',M.fio]],
    [['Дата тестирования',M.date],['Билет','№ '+M.t.n]],
    [['Допустимо ошибок',String(M.maxerr)],['Ошибок',String(wrong)]],
    [['Правильных ответов',(q.length-wrong)+' из '+q.length],['Время начала / окончания',M.time]]];
  rows.forEach(function(r){var tr=el('tr');r.forEach(function(c){tr.appendChild(el('td','k',c[0]));var v=el('td',null,c[1]);if(r.length===1)v.colSpan=3;tr.appendChild(v)});info.appendChild(tr)});
  p.appendChild(info);
  p.appendChild(el('div','res '+(ok?'ok':'no'),ok?'РЕЗУЛЬТАТ: ЗАЧЁТ':'РЕЗУЛЬТАТ: НЕЗАЧЁТ'));
  var tb=el('table','ans');
  var cg=document.createElement('colgroup');['5%','43%','24%','22%','6%'].forEach(function(w){var c=document.createElement('col');c.style.width=w;cg.appendChild(c)});tb.appendChild(cg);
  var hd=el('tr');['№','Вопрос','Ответ тестируемого','Правильный ответ','Итог'].forEach(function(h){hd.appendChild(el('th',null,h))});
  var th=el('thead');th.appendChild(hd);tb.appendChild(th);
  var bd=el('tbody');
  q.forEach(function(x,i){
    var a=M.ans[i],good=a===x.a,tr=el('tr');
    tr.appendChild(el('td','c',String(i+1)));
    tr.appendChild(el('td',null,x.t));
    if(good){var tg=el('td','good',L[a]+') '+x.o[a]);tg.colSpan=2;tr.appendChild(tg)}
    else{tr.appendChild(el('td','bad',a<0?'— нет ответа':L[a]+') '+x.o[a]));tr.appendChild(el('td',null,L[x.a]+') '+x.o[x.a]))}
    tr.appendChild(el('td','c '+(good?'good':'bad'),good?'✓':'✗'));
    bd.appendChild(tr);
  });
  tb.appendChild(bd);p.appendChild(tb);
  var blk=el('div','block');
  blk.appendChild(el('h4',null,'Комиссия по проверке'));
  var ct=el('table','comm');
  var ch=el('tr');['№','ФИО','Должность','Подпись'].forEach(function(h){ch.appendChild(el('th',null,h))});
  var cth=el('thead');cth.appendChild(ch);ct.appendChild(cth);
  var cb=el('tbody');
  M.comm.forEach(function(m,i){var tr=el('tr');tr.appendChild(el('td',null,String(i+1)));tr.appendChild(el('td',null,m.n));tr.appendChild(el('td',null,m.p||''));tr.appendChild(el('td',null,''));cb.appendChild(tr)});
  ct.appendChild(cb);blk.appendChild(ct);
  blk.appendChild(el('div','sign')).appendChild(el('div',null,'Тестируемый (подпись, ФИО)'));
  p.appendChild(blk);
  return {ok:ok,wrong:wrong};
}
function finish(){
  S.end=new Date();window.onbeforeunload=null;
  var q=S.t.q,wrong=0,wrongList=[],ansTxt=[];
  q.forEach(function(x,i){
    var good=S.ans[i]===x.a;
    if(!good){wrong++;wrongList.push(i+1)}
    ansTxt.push((i+1)+':'+(S.ans[i]<0?'-':L[S.ans[i]])+(good?'':' (верно '+L[x.a]+')'));
  });
  var ok=wrong<=S.maxerr;
  var secs=Math.max(0,Math.round((S.end-S.start)/1000));
  renderProtocol({unit:S.unit,fio:S.fio,date:fmtDate(S.dt),t:S.t,time:fmtTime(S.start)+' / '+fmtTime(S.end)+'  (затрачено '+Math.floor(secs/60)+' мин '+pad(secs%60)+' с)',maxerr:S.maxerr,ans:S.ans,comm:S.comm});
  $('b-new').classList.remove('hidden');$('b-back').classList.add('hidden');
  $('reg-status').style.color='';
  if(REMOTE)remoteDone(ok,wrong,q.length);
  show('s-res');
  sendToRegistry({unit:S.unit,fio:S.fio,date:fmtDate(S.dt),ticket:S.t.n,start:fmtTime(S.start),end:fmtTime(S.end),
    minutes:Math.round(secs/60),commission:commText(),maxerr:S.maxerr,correct:q.length-wrong,wrong:wrong,
    result:ok?'ЗАЧЁТ':'НЕЗАЧЁТ',answers:ansTxt.join('; '),wrongList:wrongList.join(', ')});
}

/* ---------- результаты из реестра (для администратора) ---------- */
var AK='iteco_bdd_akey',REG={h:{},rows:[]};
function regErr(code){var e=new Error(code);e.code=code;return e}
function regGet(akey){
  var url=REG_URL+'?akey='+encodeURIComponent(akey);
  return fetch(url).then(function(r){
    return r.text().then(function(t){try{return JSON.parse(t)}catch(x){throw regErr('format')}});
  }).catch(function(){
    return new Promise(function(res,rej){
      var cb='cb'+Date.now(),sc=document.createElement('script'),got=false;
      var to=setTimeout(function(){done();rej(regErr('timeout'))},15000);
      function done(){clearTimeout(to);try{delete window[cb]}catch(e){window[cb]=undefined}if(sc.parentNode)sc.parentNode.removeChild(sc)}
      window[cb]=function(d){got=true;done();res(d)};
      sc.onload=function(){if(!got){done();rej(regErr('format'))}};
      sc.onerror=function(){if(!got){done();rej(regErr('net'))}};
      sc.src=url+'&callback='+cb;document.head.appendChild(sc);
    });
  });
}
function rg(row,name){var i=REG.h[name];return i==null?'':String(row[i]==null?'':row[i])}
function renderList(){
  var f=clean($('rflt').value).toLowerCase(),tb=$('rtab');tb.innerHTML='';
  var hd=el('tr');['Дата','ФИО','Подразд.','Билет','Итог',''].forEach(function(h){hd.appendChild(el('th',null,h))});tb.appendChild(hd);
  var shown=0;
  REG.rows.forEach(function(row){
    var fio=rg(row,'ФИО'),unit=rg(row,'Автоколонна / подразделение');
    if(f&&(fio+' '+unit).toLowerCase().indexOf(f)<0)return;
    var res=rg(row,'Результат'),tr=el('tr');
    tr.appendChild(el('td',null,rg(row,'Дата тестирования')||rg(row,'Отправлено').slice(0,10)));
    tr.appendChild(el('td',null,fio));tr.appendChild(el('td',null,unit));tr.appendChild(el('td',null,rg(row,'Билет')));
    tr.appendChild(el('td',res==='ЗАЧЁТ'?'ok':'no',res));
    var td=el('td'),bt=el('button','btn small','Протокол');bt.onclick=function(){openRowProtocol(row)};td.appendChild(bt);tr.appendChild(td);
    tb.appendChild(tr);shown++;
  });
  $('reg-msg').textContent='Показано: '+shown+' из '+REG.rows.length;$('reg-msg').style.color='';
}
function openRowProtocol(row){
  var n=parseInt(rg(row,'Билет'),10),t=null;
  DATA.forEach(function(x){if(x.n===n)t=x});
  var fail=function(m){$('reg-msg').textContent=m;$('reg-msg').style.color='#b3261e'};
  if(!t)return fail('Билета № '+n+' нет в текущей базе, протокол восстановить нельзя.');
  var ans=[],i;for(i=0;i<t.q.length;i++)ans.push(-1);
  var items=rg(row,'Ответы по вопросам').split(';'),okBase=items.length>=t.q.length-0&&true;
  items.forEach(function(it){
    var m=/^\s*(\d+):\s*([а-е-])(?:\s*\(верно\s+([а-е])\))?/.exec(it);if(!m)return;
    var qi=parseInt(m[1],10)-1;if(qi<0||qi>=t.q.length){okBase=false;return}
    var g=m[2]==='-'?-1:L.indexOf(m[2]),right=m[3]?L.indexOf(m[3]):g;
    if(right!==t.q[qi].a)okBase=false;
    ans[qi]=g;
  });
  if(!okBase||items.length!==t.q.length)return fail('Эта запись получена по прежней базе билетов — протокол по ней корректно восстановить нельзя.');
  var comm=rg(row,'Комиссия').split(';').map(function(x){x=clean(x);if(!x)return null;var m=/^(.*?)(?:\s\((.*)\))?$/.exec(x);return {n:m[1],p:m[2]||''}}).filter(Boolean);
  var me=parseInt(rg(row,'Допустимо ошибок'),10);if(isNaN(me))me=0;
  var mins=rg(row,'Минут');
  renderProtocol({unit:rg(row,'Автоколонна / подразделение'),fio:rg(row,'ФИО'),date:rg(row,'Дата тестирования'),t:t,
    time:rg(row,'Начало').slice(0,5)+' / '+rg(row,'Окончание').slice(0,5)+(mins?'  (затрачено около '+mins+' мин)':''),maxerr:me,ans:ans,comm:comm});
  $('reg-status').textContent='';$('b-new').classList.add('hidden');$('b-back').classList.remove('hidden');
  show('s-res');
}
$('b-reg').onclick=function(){try{$('akey').value=localStorage.getItem(AK)||''}catch(e){}show('s-reg')};
$('b-reg-back').onclick=function(){show('s-start')};
$('b-back').onclick=function(){show('s-reg')};
$('rflt').oninput=renderList;
$('b-load').onclick=function(){
  var k=$('akey').value.trim(),m=$('reg-msg');
  if(!k){m.textContent='Введите ключ администратора.';m.style.color='#b3261e';return}
  m.textContent='Загрузка…';m.style.color='';
  regGet(k).then(function(d){
    if(!d||d.error){m.textContent=d&&d.error==='denied'?'Неверный ключ администратора.':'Ошибка ответа сервера.';m.style.color='#b3261e';return}
    try{localStorage.setItem(AK,k)}catch(e){}
    try{REG.h={};(d.headers||[]).forEach(function(h,i){REG.h[h]=i});REG.rows=d.rows||[];renderList()}
    catch(e){m.textContent='Данные получены, но не отобразились: '+e.message;m.style.color='#b3261e'}
  }).catch(function(e){
    var c=e&&e.code,msg;
    if(c==='format')msg='Сервер ответил, но не данными: в скрипте нет doGet, не развёрнута новая версия, либо у развёртывания не стоит доступ «Все». Откройте адрес реестра в браузере и посмотрите, что там написано.';
    else if(c==='net')msg='Нет связи с серверами Google (script.google.com): проверьте интернет, отключите блокировщик рекламы или VPN/прокси и повторите.';
    else if(c==='timeout')msg='Сервер не ответил за 15 секунд. Проверьте интернет и повторите; если повторяется — адрес реестра (REG_URL) указан неверно или недоступен.';
    else msg='Не удалось получить данные: '+(e&&e.message?e.message:'неизвестная ошибка');
    m.textContent=msg;m.style.color='#b3261e';
  });
};
$('b-print').onclick=function(){window.print()};
flushPending();
$('b-new').onclick=function(){
  if(!confirm('Начать новый тест? Текущий протокол будет закрыт — убедитесь, что он распечатан.'))return;
  $('fio').value='';show('s-start');
};
