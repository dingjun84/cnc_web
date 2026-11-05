// 公共脚本：汉堡菜单 / 案例筛选 / 询价表单前端校验（示例，未接后端）
document.addEventListener('DOMContentLoaded',function(){
  var en=document.documentElement.lang==='en';
  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  if(b)b.addEventListener('click',function(){m.classList.toggle('open');b.setAttribute('aria-expanded',m.classList.contains('open'))});
  var fs=document.querySelectorAll('.filters button');
  fs.forEach(function(btn){btn.addEventListener('click',function(){
    fs.forEach(function(x){x.classList.remove('on')});btn.classList.add('on');
    var k=btn.dataset.f;document.querySelectorAll('.case').forEach(function(c){c.style.display=(k==='all'||c.dataset.ind===k)?'':'none'});
  })});
  var f=document.getElementById('quoteForm');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    function chk(id,test,msg){var el=document.getElementById(id);if(!el)return;var er=el.parentNode.querySelector('.err');var good=test(el);el.classList.toggle('bad',!good);if(er)er.textContent=good?'':msg;if(!good)ok=false}
    chk('name',function(el){return el.value.trim().length>=2},en?'Enter your name':'请填写姓名');
    chk('phone',function(el){return /^(1\d{10}|[\w\-]{5,30}|0\d{2,3}-?\d{7,8})$/.test(el.value.trim())},en?'Enter a valid phone number or WeChat ID':'请填写有效的手机号或微信号');
    chk('email',function(el){return !el.value||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)},en?'Enter a valid email address':'邮箱格式不正确');
    chk('material',function(el){return el.value!==''},en?'Select a material':'请选择材料');
    chk('qty',function(el){return +el.value>0},en?'Enter a quantity':'请填写数量');
    chk('file3d',function(el){if(!el.files.length)return true;var f=el.files[0];return /\.(step|stp|igs|iges)$/i.test(f.name)&&f.size<=50*1024*1024},en?'3D files must be STEP, IGS or IGES, up to 50 MB':'3D 文件仅支持 STEP/IGS/IGES，≤50MB');
    chk('file2d',function(el){if(!el.files.length)return true;var f=el.files[0];return /\.(pdf|dwg|dxf)$/i.test(f.name)&&f.size<=50*1024*1024},en?'2D files must be PDF, DWG or DXF, up to 50 MB':'2D 图纸仅支持 PDF/DWG/DXF，≤50MB');
    var n=document.getElementById('notice');
    if(ok){n.style.display='block';n.textContent=en?'Demo only: this form is not connected to a submission service. Once integrated, the team can acknowledge your RFQ and return a quote or DFM feedback.':'示例：表单尚未接入后端。正式上线后，我们将在 24 小时内与您联系并报价（必要时先反馈 DFM 意见）。';f.reset()}else n.style.display='none';
  });
});
