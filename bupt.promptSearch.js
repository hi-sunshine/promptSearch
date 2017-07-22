(function(){
	var promptSearch = {};
	var flag = false;
	//build the ui
	promptSearch.ui = function(id, params){
		var $obj = document.getElementById(id);
		var $width = parseInt(params.width) || 400;
		var $height = parseInt(params.height) || 30;
		if($height>35 || $height<25){
			$height = 30;
		}
		$obj.className = 'bupt-promptSearch-search-input';
		$obj.style.width = $width - 30 + 'px';
		$obj.style.height = $height - 2 + 'px';
		var $wrapperContainer = document.createElement('div');
		$wrapperContainer.style.width = $width + 'px';
		$wrapperContainer.style.height = $height + 'px';
		$wrapperContainer.className = 'bupt-promptSearch-wrapper-container';
		var $ulContainer = document.createElement('ul');
		$ulContainer.className = 'bupt-promptSearch-ul-container';
		$wrapperContainer.appendChild($obj);
		$wrapperContainer.appendChild($ulContainer);
		document.body.appendChild($wrapperContainer);
	}

	//add event listener
	promptSearch.addEventListener = function(obj, event, fn){
		if(obj.addEventListener){
			obj.addEventListener(event, fn, false);
		}else if(obj.attachEvent){
			obj.attachEvent('on'+event, fn);
		}else{
			obj['on'+event] = fn;
		}
	}

	//listen onInput event
	promptSearch.onInputCall = function(event){
		if(event.target.value.trim() !== ''){
			var s = document.createElement('script');
			s.src = 'http://www.baidu.com/su?&wd=' + encodeURI(this.value.trim()) + '&p=3&cb=promptSearch.callBackFun';
			document.body.appendChild(s);
			s.setAttribute('id', 'bupt-prompt-remoteScript');
		};
	}

	//callback function
	promptSearch.callBackFun = function(data){
		var $wrapperContainer = document.getElementsByClassName('bupt-promptSearch-wrapper-container')[0];
		var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
		if(data['s'].length == 0){
			$ulContainer.style.display = 'none';
		}else{
			var $newULContainer = document.createElement('ul');
			data.s.forEach(function(item){
				var li = document.createElement('li');
				li.innerHTML = item;
				li.className = 'bupt-prompt-li-unative';
				$newULContainer.appendChild(li);
			});
			$wrapperContainer.replaceChild($newULContainer, $ulContainer);
			$newULContainer.className = 'bupt-promptSearch-ul-container';
			$ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0]; 
			$ulContainer.style.display = 'block';
			promptSearch.addEventListener($newULContainer, 'click', function(event){
				var e = event || window.event;
				var target = e.target || e.srcElement;
				var wd = target.textContent;
				window.open('https://www.baidu.com/s?word='+ wd);
			});
		}
		
		//delete script
		var $script = document.getElementById('bupt-prompt-remoteScript');
		document.body.removeChild($script);
	}

	//listen the keydown event
	promptSearch.onKeyDown = function(event){
		var e = event || window.event;
		var keyCode = e.keyCode||e.which||e.charCode;
		if(keyCode == 8){
			//back space
			var $searchInput = document.getElementsByClassName('bupt-promptSearch-search-input')[0];
			if($searchInput.value == ''){
				var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
				$ulContainer.style.display = 'none';
			}
		}else if(keyCode == 40){
			//down
			var inx = -1;
			var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
			var $list = $ulContainer.childNodes;
			var len = $list.length;
			for(var i=0; i<len; i++){
				if($list[i].className =='bupt-prompt-li-ative'){
					inx = i;
				}
				if(inx != len-1){
					$list[i].className = 'bupt-prompt-li-unative';
				}
			}
			if(inx == -1){
				$list[0].className = 'bupt-prompt-li-ative';
			}else if(inx>=0 && inx<len-1){
				$list[inx+1].className = 'bupt-prompt-li-ative';
			}

		}else if(keyCode == 38){
			//up
			var inx = -1;
			var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
			var $list = $ulContainer.childNodes;
			for(var i=0, len=$list.length; i<len; i++){
				if($list[i].className =='bupt-prompt-li-ative'){
					inx = i;
				}
				$list[i].className ='bupt-prompt-li-unative';
			}
			if(inx == 0){
				$list[0].className ='bupt-prompt-li-ative';
			}else if(inx >= 1){
				$list[inx-1].className ='bupt-prompt-li-ative';
			}
		}else if(keyCode == 13){
			var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
			var $list = $ulContainer.childNodes;
			for(var i=0, len=$list.length; i<len; i++){
				if($list[i].className =='bupt-prompt-li-ative'){
					var wd = $list[i].innerHTML;
					window.open('https://www.baidu.com/s?word='+ wd);
					break;
				}
			}
		}
	}

	//listen mouseover event
	promptSearch.onMouseOver = function(event){
		var e = event || window.event;
		var target = e.target || e.srcElement;
		if(target.className=='bupt-prompt-li-ative' || target.className=='bupt-prompt-li-unative'){
			var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
			var $list = $ulContainer.childNodes;
			for(var i=0, len=$list.length; i<len; i++){
				$list[i].className ='bupt-prompt-li-unative';
				if($list[i] == target){
					target.className = 'bupt-prompt-li-ative';
				}
			}	
		}		
	}

	//listen the blur event
	promptSearch.onBlur = function(){
		flag = true;
		var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
		$ulContainer.style.display = 'none';
	}

	//listen the focus event
	promptSearch.onFocus = function(){
		if(flag == true){
			flag = false;
			var $ulContainer = document.getElementsByClassName('bupt-promptSearch-ul-container')[0];
			var $list = $ulContainer.childNodes;
			for(var i=0, len=list.length; i<len; i++){
				$list[i].className ='bupt-prompt-li-unative';
			}
			$ulContainer.style.display = 'block';
		}
	}

	//init funciton
	promptSearch.init = function(id, params){
		promptSearch.ui(id, params);
		$searchInput = document.getElementsByClassName('bupt-promptSearch-search-input')[0];
		$wrapperContainer = document.getElementsByClassName('bupt-promptSearch-wrapper-container')[0];
		promptSearch.addEventListener($searchInput, 'input', promptSearch.onInputCall);
		promptSearch.addEventListener($searchInput, 'focus', promptSearch.onFocus);
		promptSearch.addEventListener($wrapperContainer, 'blur', promptSearch.onBlur);
		promptSearch.addEventListener($wrapperContainer, 'mouseover', promptSearch.onMouseOver);
		promptSearch.addEventListener(document, 'keydown', promptSearch.onKeyDown);
	}

	window.promptSearch = promptSearch;
})();
