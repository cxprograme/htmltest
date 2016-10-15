var BackBone=(function(){
	var $;
	var backbone={};
	backbone.init=function(sel)
	$ = function(selector, context){
		return backbone.init(selector, context)
	}
	return $;
})();

window.BackBone=BackBone;
window.$ === undefined && (window.$ = BackBone)