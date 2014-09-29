var BindValidForm = function (){
	$('form').each(function (i, e){
		var form = $(e);
		if(form.attr('bind-valid') === undefined){
			var configValidation = {};
			configValidation.rules = {};
			configValidation.messages = {};
			form.find('input[fbio-required],textarea[fbio-required]').each(function (i2, e2){
				var el = $(e2);
				var name = el.attr('name');
				var msg = el.attr('msg-required');
				var rulesField = {};
				if(el.attr('fbio-required') != undefined){
					rulesField.required = true;
					messagesField = {};
					messagesField.required = msg;
				}
				if(el.attr('fbio-email') != undefined){
					rulesField.email = true;
					messagesField.email = "E-mail inválido.";
				}
				if(el.attr('fbio-cpf') != undefined){
					$('#Cpf').focus(function() {
				      	$(this).unmask();
				    }).blur(function() {
				        $(this).mask("999.999.999-99"); 
				    });
					rulesField.cpf = true;
					messagesField.cpf = "CPF inválido.";
				}
				if(el.attr('fbio-cnpj') != undefined){
					$('#Cnpj').focus(function() {
				       $(this).unmask();
				    }).blur(function() {
				       $(this).mask("99.999.999/9999-99");   
				    });
					rulesField.cnpj = true;
					messagesField.cnpj = "CNPJ inválido.";
				}
				if(el.attr('fbio-cpfcnpj') != undefined){
					el.focus(function() {
				       $(this).unmask();
				    }).blur(function() {
				       	if(el.val().replaceAll('.','').replaceAll('-','').length == 11) {
				    	   el.mask("999.999.999-99");   
				   		} else if (el.val().replaceAll('.','').replaceAll('-','').length == 14){
				   			el.mask("99.999.999/9999-99");
				   		}
				    });
					rulesField.cpfcnpj = true;
					messagesField.cnpj = "CPF/CNPJ inválido.";
				}
				eval('configValidation.rules.'+name+' = ' + JSON.stringify(rulesField));
				eval('configValidation.messages.'+name+' = {}');
				eval('configValidation.messages.'+name+' = ' + JSON.stringify(messagesField));
				el.mouseover(function (e){
					var elm = $(this);
					if(elm.is('.error')){
						var left = el.position().left;
						elm.parent().find('label.error').css('top','auto');
						elm.parent().find('label.error').css('left',left);
					};
				});
				el.mouseout(function (e){
					var elm = $(this);
					if(elm.is('.error')){
						elm.next().css('top','-1000px');
					};
				});
			});
			form.validate(configValidation);
			form.attr('bind-valid','true');
		}
	});
}