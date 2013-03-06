/*************************************************************
* jQuery FishEye plugin v0.1.0
* Copywright (c) 2013 johnny chen
* http://www.cnblogs.com/JohnnyChen/
*
* Licensed under the GNU General Public License: 
* http://www.gnu.org/licenses/gpl.html
**************************************************************/
;(function($){
	$.fn.fishEye=function(args){
		
		var itemSelector=args.itemSelector?args.itemSelector:'img',
		itemContainer=args.itemContainer?args.itemContainer:'.nav',
		scalePercent=args.scalePercent?args.scalePercent:60,
		scaleStepPercent=args.scaleStepPercent?args.scaleStepPercent:30;
		
		var curScaleIndex=0;
		var t;
		function init(){
			$(itemSelector,$(itemContainer)).each(function(index,item){
				$(item).mouseover(function(){
					expandMe(item,scalePercent);
					curScaleIndex=index;
				});
				
				$(item).mouseout(function(){
					curScaleIndex=null;
					t=setTimeout(function(){
						resetContainer();
					},200);
				});
				
				$(item).attr('index',index);
				$(item).attr('initHeight',$(item).height());
				$(item).attr('initWidth',$(item).width());
			})
			
		}
		
		function expandMe(me,scalePercent){
			if($(me).attr('index')==curScaleIndex){
				return ;
			}
			
			resetContainer();
			
			expandStep(me,scalePercent);
			
			//expand prev
			var prev=$(me).prev();
			var stepPercent=scalePercent;
			while(true){
				stepPercent-=scaleStepPercent;

				if(stepPercent<=0 || !prev[0]){
					break;
				}
				expandStep(prev,stepPercent);
				prev=prev.prev();
			}
			
			//expand next
			prev=$(me).next();
			stepPercent=scalePercent;
			while(true){
				stepPercent-=scaleStepPercent;
				if(stepPercent<=0 || !prev[0]){
					break;
				}
				expandStep(prev,stepPercent);
				prev=prev.next();
			}
		}
		
		function expandStep(me,percent){
			var initHeight = parseFloat($(me).attr('initHeight'));
			var initWidth=parseFloat($(me).attr('initWidth'));
			
			var height=initHeight+initHeight*(percent/100)+'px';
			var width=initWidth+initWidth*(percent/100)+'px';

			$(me).height(height);
			$(me).width(width);
		}
		
		function resetContainer(){
			if(curScaleIndex!=null){
				if(t){
					clearTimeout(t);
				}
				return;
			}
			$(itemSelector,$(itemContainer)).each(function(index,item){
				var initHeight = parseFloat($(item).attr('initHeight'));
				var initWidth=parseFloat($(item).attr('initWidth'));

				$(item).height(initHeight);
				$(item).width(initWidth);
			});
			
		}
		
		init();
		return this;
	}
	
	
}(jQuery));