/* ===========================================================
 * 
 * modal-utils.js v0 .1
 * Marco A. Simao
 *
 * Dependencias: bootstrap-modal
 * 
 * Exemplo de uso:
 * 
 * $.ModalUtils('warning', {
        modalLabel:'Atenção!', 
        modalBody: 'Alerta algo para o usuário! Deseja continuar?',
        buttons: [
                    {
                        'render'   :'<button class="btn btn-primary" data-id="%modalId%" data-dismiss="modal" aria-hidden="true"><i class="icon-ok icon-white"></i> Continuar </button>',
                        'callback' :function (e) { 
                                                    e.preventDefault();
                                                    
                                                    foo(); 
                                                 }
                    }],
        modal: false 
    });
 * 
 * ===========================================================
 * Copyright 2013 Enova Interactive Serviços de Informática.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */

(function ($) {
    var date      = new Date();

    var fechar_id = date.getMilliseconds();

    var defaultButtons = [
         {
             'render'       : '<button class="btn btn-default" data-id="%modalId%" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i> Fechar</button>'.replace('%modalId%', fechar_id),
             'callback'     : function (e) { var data = $(this).data(); $('#' + data.id).modal('hide'); $('#' + data.id).remove(); }
         },
         {
             'render'       : '<button class="btn btn-primary">Salvar</button>',
             'callback'     : null
         },
         {
             'render'       : '<button class="btn" data-dismiss="modal" aria-hidden="true"><i class="icon-ok"></i> OK</button>',
             'callback'     : null
         }
    ];

    var layout_bootstrap2 =  '<div id="%modalId%" class="modal fade %modalClass%" tabindex="-1" role="dialog" aria-labelledby="%modalLabel%" aria-hidden="true">'
        +   '<div class="modal-header">'
        +       '<h3 id="%modalLabelId%">%modalLabel%</h3>'
        +   '</div>'
        +   '<div class="modal-body">%modalBody%</div>'
        +   '<div class="modal-footer" id="modal-buttons%modalId%"></div>'
        + '</div>';

    var layout = '<div id="%modalId%" class="modal" tabindex="-1" role="dialog">'
        + '<div class="modal-dialog" role="document">'
        +  '<div class="modal-content">'
        +    '<div class="modal-header">'
        +      '<h4 class="modal-title" id="%modalLabelId%">%modalLabel%</h4>'
        +    '</div>'
        +    '<div class="modal-body">'
        +      '%modalBody%'
        +    '</div>'
        +    '<div class="modal-footer" id="modal-buttons%modalId%"></div>'
        +     '</div></div></div>';

    $.ModalUtils = function (type, options) {

        var date     = new Date();
        var modalId  = (!options.modalId ? 'modal_' + date.getMilliseconds() : options.modalId);
        var button_function = '';

        var settings = $.extend({
            modalLabel: 'Alerta',
            modalLabelId: 'atencaoLabel',
            modalBody: '',
            buttons: defaultButtons,
            modalId: modalId
        }, options);

        //vars: modalId, modalClass, modalLabelId, modalLabel, modalBody, modalButtons
        if (typeof $.prototype.modal != 'function')
        {
            alert('Para utilizar ModalUtils é necessário o Bootstrap Modal, script não carregado.');
        }
        else
        {
            $('#' + settings.modalId).remove();

            var buttons = '';

            var content = layout
            .replace(/%modalLabel%/gi, settings.modalLabel)
            .replace(/%modalLabelId%/gi, settings.modalLabelId)
            .replace(/%modalId%/gi, settings.modalId);

            switch (type)
            {
                case 'simple':
                    break;

                case 'success':
                        content = content.replace(/%modalBody%/gi, '<div class="alert alert-success"><i class="fa fa-check fa-3" style="margin-top: 5pt; float: left;"></i> <p>' + settings.modalBody + '</p>');
                    break;

                case 'info':
                        content = content.replace(/%modalBody%/gi, '<div class="alert alert-info"><i class="fa fa-info fa-3" style="margin-top: 5pt; float: left;"></i> <p>' + settings.modalBody + '</p>');
                    break;

                case 'error':
                        content = content.replace(/%modalBody%/gi, '<div class="alert alert-error"><i class="icon-exclamation-sign" style="margin-top: 5pt; float: left;"></i> <p>' + settings.modalBody + '</p>');
                    break;

                case 'warning':
                default:
                        content = content.replace(/%modalBody%/gi, '<div class="alert alert-warning"><i class="fa fa-exclamation-triangle fa-3" style="margin-top: 5pt; float: left;"></i> <p>' + settings.modalBody + '</p>');
                    break;
            }
            
            content = content + '</div>';

            if (settings.modal == true)
            {
                settings.buttons = {};
            }
            
            content = content.replace('<div class="modal-header">', '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');

            var new_buttons = [];

            // if we have no content, we place loading at modalBody
            if (settings.modalBody.length < 1)
                content = content.replace(/%modalBody%/gi, '<img src="/bundles/enovaadm/images/ajax-loader.gif" />');

            $('body').append(content);

            $('#' + settings.modalId).modal({ backdrop: 'static' }).modal('show');

            for (b in settings.buttons)
            {
                if (typeof settings.buttons[b].callback == 'function')
                {
                    $('#modal-buttons' + settings.modalId).append($(settings.buttons[b].render.replace(/%modalId%/, settings.modalId)).click(settings.buttons[b].callback));
                }
            }

        }
    };
}(jQuery));
