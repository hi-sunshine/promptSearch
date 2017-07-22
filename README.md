# promptSearch

![](https://github.com/AnonymousBoy1/promptSearch/raw/master/img.png) 
<br>
This project provided a google-search-box-liked javascript plugin. It can build a search-box which give some real-time suggestive items according your input value for your selection to help you do search conveniently.

Usage
-----
1. Import the `bupt.promptSearch.css` and `bupt.promptSearch.js`into your page.<br>
```html
<link type="text/css" rel="stylesheet" href="bupt.promptSearch.css" />
<script type="text/javascript" src="bupt.promptSearch.js"></script>
```

2. Use the promptSearch like follow.<br>
```html
  <input id="search"/>
	<script type="text/javascript" src="./bupt.promptSearch.js"></script>
	<script type="text/javascript">
		var params = {
			width: '400px',
			height: '25px'
		};
		promptSearch.init('search', params);
	</script>
```

Note
----- 
1. The `bupt.promptSearch.js` must imported before you invoke `promptSearch.init()`. The order of javascript is very important.
2. The `width` is suggested to be settd a value which bigger than 400px, to avoid the suggestive information is too long to display error. It's default value is 400px;
3. The `height` is suggested to be setted a value which between 25px and 35px. In fact, the value will be setted 30px when you set it did not in [25px, 35px]. It's default value is 30px;

Example
----
`example.html` provided an complete example of this promptSearch plugin.


