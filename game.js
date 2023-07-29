var a=[], a0=[], b=[0, 0, 0, 0], b0=[0, 0, 0, 0], ca=[], cb=[], px=0, py=0, now=0;
for(var i=0; i<6; ++i)a.push([0, 0, 0, 0]);
for(var i=0; i<6; ++i)a0.push([0, 0, 0, 0]);

function rand(max){return Math.floor(Math.random()*max);}

for(var i=0; i<6; ++i)for(var j=0; j<3; ++j)a[i][j]=rand(4);
for(var i=0; i<3; ++i)b[i]=rand(4);

function totyp(n){
	if(n==0)return 'A';
	if(n==1)return 'C';
	if(n==2)return 'G';
	if(n==3)return 'N';
	return 'Unknown';
}

function typto(c){
	if(c=='a'||c=='A')return 0;
	if(c=='c'||c=='C')return 1;
	if(c=='g'||c=='G')return 2;
	if(c=='n'||c=='N')return 3;
	return -1;
}

function toNum(a, b){
	if(a<b)return Math.ceil(a+(b-a)/10);
	if(a>b)return Math.floor(a+(b-a)/10);
	return a;
}

function toStr(n){
	var s=String(n), t=new String();
	for(var i=0; i<s.length; ++i){
		if(s[i]==0)t+='<img src="arctan.png" width="22px">';
		else t+=s[i];
	}
	return t;
}

function wei(a, b, c){ // atk1 typ1 typ2
	if((c-b+4)%4==1)return Math.floor(1.5*a);
	if((c-b+4)%4==3)return Math.floor(2*a/3);
	return a;
}

function upd(){
	var s='', t=['血量', '攻擊力', '屬性', '累積攻擊'];
	for(var i=0; i<4; ++i){
		s+='<tr><th>'+t[i]+'</th>';
		for(var j=0; j<6; ++j){
			if(px==j&&py==i)s+='<td class="on">';
			else s+='<td>';
			a0[j][i]=toNum(a0[j][i], a[j][i]);
			s+=(i==2?totyp(a0[j][i]):toStr(a0[j][i]))+'</td>';
		}
		s+='</tr>\n';
	}
	document.querySelector('#player').innerHTML=s;
	s='';
	for(var i=0; i<4; ++i){
		if(py<0&&px==i)s+='<td class="on">';
		else s+='<td>';
		b0[i]=toNum(b0[i], b[i]);
		s+=(i==2?totyp(b0[i]):toStr(b0[i]))+'</td>';
	}
	document.querySelector('#boss').innerHTML=s;
	s=0;
	for(var i=0; i<6; ++i)s+=wei(a0[i][1], a0[i][2], b0[2]);
	document.querySelector('#attack').innerHTML=toStr(s);
}

setInterval(upd, 1000/30);

function player(){
	var atk=0;
	for(var i=0; i<6; ++i)if(a[i][0]>0){
		var d=wei(a[i][1], a[i][2], b[2]);
		atk+=d, a[i][3]+=d;
	}
	b[0]-=atk;
}

function boss(){
	for(var i=0; i<6; ++i)if(a[i][0]>0)a[i][0]-=wei(b[1], b[2], a[i][2]), b[3]+=Number(a[i][0]<=0);
	b[2]=(b[2]+1)%4;
}

function copy(a){
	var a0=new Array();
	for(var i=0; i<6; ++i)a0.push([0, 0, 0, 0]);
	for(var i=0; i<6; ++i)for(var j=0; j<4; ++j)a0[i][j]=a[i][j];
	return a0;
}

function copy2(b){
	var b0=new Array();
	for(var i=0; i<4; ++i)b0.push(b[i]);
	return b0;
}

/*
var a=[], b=[], c=[], lock=[], chain=[0, 0, 0, 0, 0, 0], px=0, py=0, now=0;
for(var i=0; i<6; ++i)a.push([[0], [0], [0], [0]]), b.push([0, 0, 0, 0]), lock.push([0, 0, 0, 0]);

function toStr(n){
	n=String(n);
	var i=0;
	for(; i<n.length; ++i)if(n[i]=='e')break;
	if(n.length>10)return n.slice(0, i-n.length+10)+n.slice(i);
	return n;
}

function upd(){
	s='';
	for(var i=0; i<6; ++i){
		s+='<tr><th class="c'+String(chain[i])+'">第 '+String(i+1)+' 組</th>';
		for(var j=0; j<4; ++j){
			if(lock[i][j])s+='<td class="lock">';
			else if(i==px&&j==py)s+='<td class="on">';
			else s+='<td>';
			if(isNaN(a[i][j][b[i][j]])||1/a[i][j][b[i][j]]==0)a[i][j][b[i][j]]=0;
			s+=toStr(a[i][j][b[i][j]])+'</td>';
		}
		s+='</tr>\n';
	}
	document.querySelector('#table').innerHTML=s;
	if(py==-1)s='<tr><th width="50%">所有值</th><td>第 '+String(px+1)+' 組</td>';
	else{
		n=a[px][py].length, w='width="'+String(100/(n+1))+'%"';
		s='<tr><th '+w+'>所有值</th>';
		for(var i=0; i<a[px][py].length; ++i){
			if(i==b[px][py])s+='<td class="on" '+w+'>';
			else s+='<td '+w+'>';
			s+=toStr(a[px][py][i])+'</td>';
		}
	}
	s+='</tr>\n';
	document.querySelector('#stack').innerHTML=s;
	s='精確值： ';
	if(py!=-1)s+=String(a[px][py][b[px][py]]);
	document.querySelector('#precision').innerHTML=s;
}
setInterval(upd, 1000/30);

function copy(a){
	a0=new Array();
	for(var i=0; i<6; ++i){
		a0.push([[], [], [], []]);
		for(var j=0; j<4; ++j)for(var k=0; k<a[i][j].length; ++k)a0[i][j].push(a[i][j][k]);
	}
	return a0;
}
*/



document.onkeydown=function(e){
	e=window.event||e;
    var k=e.keyCode;
	if(k>111&&k<122)e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	if(k==87)py=Math.max(py-1, -1), e.keyCode=0, e.returnValue=false, e.cancelBubble=false, px=py<0?Math.min(px, 3):px;
	if(k==65)px=Math.max(px-1, 0), e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	if(k==83)py=Math.min(py+1, 3), e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	if(k==68)px=Math.min(px+1, py<0?3:5), e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	//if(k==66)boss(), e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	//if(k==80)player(), e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	/*if(k==69)b[px][py]=(b[px][py]+1)%a[px][py].length, e.keyCode=0, e.returnValue=false, e.cancelBubble=false;*/
	if(k==90){
		if(ca.length>now)ca[now]=copy(a), cb[now]=copy2(b);
		else ca.push(copy(a)), cb.push(copy2(b));
		if(now>0)--now;
		a=copy(ca[now]), b=copy2(cb[now]);
		e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	}
	if(k==81){
		if(now<ca.length-1)++now, a=copy(ca[now]), b=copy2(cb[now]);
		e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	}
	/*if(k==67){
		if(py==-1)chain[px]=(chain[px]+1)%4;
		else lock[px][py]=1-lock[px][py];
		e.keyCode=0, e.returnValue=false, e.cancelBubble=false;
	}*/
	if(k==13||k==108){
		s=document.querySelector('input').value;
		if(s.length==0){alert('Unreadable!'); return 0;}
		if(ca.length>now)ca[now]=copy(a), cb[now]=copy2(b);
		else ca.push(copy(a)), cb.push(copy2(b));
		++now;
		if(s=='?')alert('Press WASD to move.\nEnter a number to set the value.\n(A, C, G, N)=(0, 1, 2, 3)\nEnter b to play a boss\'s turn.\nEnter p to play a players\' turn.');
		else if(s=='b')boss();
		else if(s=='p')player();
		else if(py<0)b[px]=Number(s);
		else a[px][py]=Number(s);
		/*else if(s[0]=='+')a[px][py][b[px][py]]+=Number(s.slice(1));
		else if(s[0]=='-')a[px][py][b[px][py]]-=Number(s.slice(1));
		else if(s[0]=='*')a[px][py][b[px][py]]*=Number(s.slice(1));
		else if(s[0]=='/')a[px][py][b[px][py]]/=Number(s.slice(1));
		else if(s[0]=='>')a[px][py].push(Number(s.slice(1))), a[px][py][b[px][py]]-=Number(s.slice(1));
		else if(s=='<'){
			for(var i=0; i<6; ++i)for(var j=0; j<4; ++j){
				var dx=Math.abs(px-i), dy=Math.abs(py-j);
				dx=Math.min(dx, 6-dx), dy=Math.min(dy, 4-dy);
				d=dx*dx+dy*dy;
				if(d!=0&&lock[i][j]==0)a[i][j][b[i][j]]=d*(a[px][py][b[px][py]]+1)/a[i][j][b[i][j]];
			}
		}
		else if(s==':'){
			m=[[], [], [], []]
			for(var i=0; i<4; ++i){
				for(var j=0; j<3; ++j)m[i].push(a[0][i][b[0][i]])
				for(var j=1; j<6; ++j)
					m[i][0]=Math.max(m[i][0], a[j][i][b[j][i]]),
					m[i][1]=Math.min(m[i][1], a[j][i][b[j][i]]),
					m[i][2]+=a[j][i][b[j][i]];
				m[i][2]/=6, m[i].push(m[i][0]-m[i][1]);
			}
			a1=[];
			for(var i=0; i<6; ++i)a1.push([0, 0, 0, 0]);
			for(var i=0; i<6; ++i)for(var j=0; j<4; ++j)for(var k=0; k<4; ++k)a1[i][j]+=a[i][k][b[i][k]]*m[k][j];
			for(var i=0; i<6; ++i)for(var j=0; j<4; ++j)if(lock[i][j]==0)a[i][j][b[i][j]]=a1[i][j];
		}
		else if(s=='[')a[px][py][b[px][py]]=Math.ceil(Math.sqrt(a[px][py][b[px][py]]));*/
	}
};

