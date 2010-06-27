Event.observe(window, 'load', function() {
    init();
});

function init() {
    new Ajax.Request('libs/backnumber.xml', {
	onSuccess: showPage
    });
}

function showPage(response) {
    var xml = response.responseXML;
    var datum = $A(xml.getElementsByTagName("data"));
    datum.each(function(data) {
	var books = $A(data.getElementsByTagName("book"));
	books.each(function(book) {
	    var cover = book.attributes.coverImage.value;
	    var month = book.attributes.month.value;
	    var divBook     = new Element('div', {"class": "book"});
	    var divCover    = new Element('div', {"class": "cover"});
	    var divContents = new Element('div', {"class": "contents"});
	    var pages = $A(book.getElementsByTagName("page"));
	    pages.each(function(page) {
		var title = page.attributes.title.value;
		var type  = page.attributes.type.value;
		var filepath = page.attributes.filepath.value;
 		var divPage = new Element('div', {"class": "page"}).insert(new Element('a', {href: filepath}).update(type + ":" + title));
		divContents.insert(divPage);
	    });
	    divCover.insert(new Element('img', {src: cover}));
	    divBook.insert(divCover).insert(divContents);
	    $('booklist').insert(divBook);
	});
    });
}

