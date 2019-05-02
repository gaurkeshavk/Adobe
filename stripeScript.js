"use strict";
    var triggers;
    var background;
    var nav;
    fetch('https://jsonblob.com/api/jsonBlob/6766327f-607d-11e9-95ef-9bcb815ba4a4', {mode: 'cors'}).then(function(response) {
      return response.text();
    }).then(function(text) {
				var data = JSON.parse(text);
				var key_data;

				var nav_id = document.getElementById('navbar');
				var ul = document.createElement("UL");
				ul.setAttribute("class", "parentUL");

				for (var key in data) {
					key_data = data[key];
					console.log("Key: " + key);

					var li_big = document.createElement("LI");

					var a_big = document.createElement("a");
					a_big.setAttribute("href", "#");
					var txt_node = document.createTextNode(key);
					a_big.appendChild(txt_node);
					li_big.append(a_big);

					var ul_inner = document.createElement("UL");
					ul_inner.setAttribute("class", "dropdown dropItem");
					
					for (var i = 0; i < key_data.length; i++) {
						var val = key_data[i];
						var val_title = " " + val['title'];
						var val_subtitle = " " + val['sub-title'];
						console.log("title: " + val_title);
						console.log("Sub-title: " + val_subtitle);

						var li_inner = document.createElement("LI");

						var span_icon = document.createElement("span");
						span_icon.setAttribute("class", "fa-stack fa-1x");

						var i_icon_circle = document.createElement("i");
						i_icon_circle.setAttribute("class", "fa fa-circle-thin fa-stack-2x");

						var i_icon_flag = document.createElement("i");
						i_icon_flag.setAttribute("class", "fa fa-circle fa-stack-1x");

						span_icon.append(i_icon_circle);
						span_icon.append(i_icon_flag);

						var span_title = document.createElement("span");
						span_title.setAttribute("class", "code");
						span_title.innerText = val_title;
						var span_subtitle = document.createElement("span");
						span_subtitle.setAttribute("class", "code");
						span_subtitle.innerText = val_subtitle;

						li_inner.append(span_icon);
						li_inner.append(span_title);
						li_inner.append(span_subtitle);
						ul_inner.append(li_inner);
					}
					li_big.append(ul_inner);
					ul.append(li_big);
					console.log("------------------------------------");
				}
				nav_id.append(ul);

				triggers = document.querySelectorAll('.parentUL > li');
				background = document.querySelector('.dropdownBackground');
				nav = document.querySelector('.top');

				triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
				triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
    });
   


   function handleEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 100);
    background.classList.add('open');

    var dropdown = this.querySelector('.dropdown');
    var dropdownCoords = dropdown.getBoundingClientRect();
    var navCoords = nav.getBoundingClientRect();

    var coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left
    };

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
  }

  function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  }

