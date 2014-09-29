// Extension plugin jQuery validator v 1.0.0
// github.com/fabiorogeriosj/jquery-validator-customized
(function() {
    
	if (typeof(jQuery) !== "function") {
		console.error('jQueryValidatorCustomized: jQuery not installed!');
	} else if(typeof(jQuery.validator) !== "function"){
		console.error('jQueryValidatorCustomized: Plugin jQuery Validator not installed!');
	} else {
		jQuery.validator.addMethod("cpf", function(value, element) {
		    return ValidCPF(value);
		}, "Informe um CPF válido.");
		jQuery.validator.addMethod("cnpj", function(value, element) {
		    return validCNPJ(value);
		}, "Informe um CNPJ válido.");
		jQuery.validator.addMethod("cpfcnpj", function(value, element) {
			var newvalue = value.replace(/[^\d]+/g,'');
			console.log(newvalue);
			if (newvalue.length <= 11) {
				return ValidCPF(newvalue);	
			} else {
				return validCNPJ(newvalue);
			}
		}, "Informe um CPF/CNPJ válido.");

		var ValidCPF = function(value){
			var cpf = value.replace(/[^\d]+/g,'');
		    while(cpf.length < 11) cpf = "0"+ cpf;
		    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
		    var a = [];
		    var b = new Number;
		    var c = 11;
		    for (i=0; i<11; i++){
		        a[i] = cpf.charAt(i);
		        if (i < 9) b += (a[i] * --c);
		    }
		    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
		    b = 0;
		    c = 11;
		    for (y=0; y<10; y++) b += (a[y] * c--);
		    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
		    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
		    return true;
		}
		var validCNPJ = function (value){
			cnpj = value.replace(/[^\d]+/g,'');
			if(cnpj == '') return false;
			if (cnpj.length != 14)
				return false;
			// Elimina CNPJs invalidos conhecidos
			if (cnpj == "00000000000000" || 
				cnpj == "11111111111111" || 
				cnpj == "22222222222222" || 
				cnpj == "33333333333333" || 
				cnpj == "44444444444444" || 
				cnpj == "55555555555555" || 
				cnpj == "66666666666666" || 
				cnpj == "77777777777777" || 
				cnpj == "88888888888888" || 
				cnpj == "99999999999999")
				return false;
				
			// Valida DVs
			tamanho = cnpj.length - 2
			numeros = cnpj.substring(0,tamanho);
			digitos = cnpj.substring(tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (i = tamanho; i >= 1; i--) {
			  soma += numeros.charAt(tamanho - i) * pos--;
			  if (pos < 2)
					pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			if (resultado != digitos.charAt(0))
				return false;
				
			tamanho = tamanho + 1;
			numeros = cnpj.substring(0,tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (i = tamanho; i >= 1; i--) {
			  soma += numeros.charAt(tamanho - i) * pos--;
			  if (pos < 2)
					pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			if (resultado != digitos.charAt(1))
				  return false;
				  
			return true;
		}
	}
})();
