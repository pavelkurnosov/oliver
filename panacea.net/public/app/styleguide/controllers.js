(function () {

    /* global angular */
    var styleguideModule = angular.module('styleguide', ['ui-notification', 'angular-growl', 'ui.bootstrap', 'ui.grid', 'ui.grid.pagination', 'ui.select', 'ngSanitize', 'angularjs-dropdown-multiselect']);

    styleguideModule.config(function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 10000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top',
                templateUrl: 'app/styleguide/templates/notification_template.html'
            });
        }
    );

    styleguideModule.config(['growlProvider', function (growlProvider) {
        growlProvider.onlyUniqueMessages(false);
        growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
    }]);

    styleguideModule.controller('StyleguideCtrl', StyleguideCtrl)
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)
        .controller('WizardCtrl', WizardCtrl);

    styleguideModule.filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

    StyleguideCtrl.$inject = ['$uibModal', 'Notification', 'growl'];
    ModalInstanceCtrl.$inject = ['$uibModalInstance'];

    function StyleguideCtrl($uibModal, Notification, growl) {
        var vm = this;
        vm.currPage = 'forms';

        vm.pages = [
            {id: 'colors', title: 'Colors'},
            {id: 'typography', title: 'Typography'},
            {id: 'font_color', title: 'Font Color'},
            {id: 'grid', title: 'Grid'},
            {id: 'paragraphs', title: 'Paragraphs'},
            {id: 'buttons', title: 'Buttons'},
            {id: 'text_boxes', title: 'Text Boxes'},
            {id: 'labels', title: 'Labels'},
            {id: 'forms', title: 'Forms'},
            {id: 'special_forms', title: 'Special Forms'},
            {id: 'wizard', title: 'Wizard'},
            {id: 'tooltip', title: 'Tooltip'},
            {id: 'tables', title: 'Tables'},
            {id: 'pagination', title: 'Pagination'},
            {id: 'modals', title: 'Modals'},
            {id: 'breadcrumbs', title: 'Breadcrumbs'},
            {id: 'faq', title: 'FAQ'},
            {id: 'tabs', title: 'Tabs'},
            {id: 'notifications', title: 'Notifications'},
            {id: 'search_results', title: 'Search Results'},
            {id: 'progress', title: 'Progress'},
            {id: 'text_editor', title: 'Text Editor'},
            {id: 'ads', title: 'Landing Header'},
            {id: 'landing_header', title: 'Landing Header'},
            {id: 'landing_nav', title: 'Landing Nav'},
            {id: 'landing_buttons', title: 'Landing Buttons'},
            {id: 'registration', title: 'Registration'},
            {id: 'profile_header', title: 'Profile Header'},
            {id: 'profile_subheader', title: 'Profile Sub-Header'},
            {id: 'profile_side_nav', title: 'Profile Side Nav'},
            {id: 'profile_colors', title: 'Profile Colors'},
            {id: 'profile_avatars', title: 'Profile Avatars'}
        ];

        vm.getPage = function () {
            for (var p in vm.pages) {
                if (vm.pages[p].id == vm.currPage) {
                    return 'app/styleguide/templates/' + vm.pages[p].id + '.html';
                }
            }
        };

        vm.setPage = function (pageId) {
            vm.currPage = pageId;
        };

        //-------------------- For Tables ----------------------------
        btns = '<a href="#"><img src="app/styleguide/imgs/page_white_find.png"></a>';
        btns += '<a href="#"><img src="app/styleguide/imgs/page_white_edit.png" style="margin-left: 3px;"></a>';
        btns += '<a href="#"><img src="app/styleguide/imgs/page_white_delete.png" style="margin-left: 3px;"></a>';

        vm.gridOptions = {      // settings for table 1 (without sorting and menu icons)
            enableCellSelection: true,
            enableCellEditOnFocus: true,
            enableColumnResizing: true,
            enableColumnMenus: true,
            enableSorting: true,
            rowHeight: 47,
            columnDefs: [
                {
                    field: 'Chk',
                    cellTemplate: '<input type="checkbox"/>',
                    cellClass: 'text-center',
                    width: "5%"
                }, {
                    field: 'Edit',
                    cellTemplate: '<a href="#"><img src="app/styleguide/imgs/icon_options.png"></a>',
                    cellClass: 'text-center',
                    width: "10%",
                    textAlign: "center"
                }, {
                    field: 'Rendering engine',
                    cellTemplate: '',
                    cellClass: 'text-center',
                    width: "20%"
                }, {
                    field: 'Browser',
                    cellTemplate: '',
                    cellClass: 'text-center',
                    width: "15%"
                }, {
                    field: 'Platform',
                    cellClass: 'text-center',
                    cellTemplate: '',
                    width: "15%"
                }, {
                    field: 'Tags',
                    cellTemplate: '<span class="badge">High</span>',
                    cellClass: 'text-center',
                    width: "15%"
                }, {
                    field: 'Actions',
                    cellTemplate: btns,
                    cellClass: 'text-center',
                    width: "20%"
                }
            ],
            data: [],
            paginationPageSize: 9,
            enableHorizontalScrollbar: 0,
            enablePaginationControls: false,
            enableVerticalScrollbar: 0
        };

        for (i = 1; i <= 100; i++) {
            vm.gridOptions.data[vm.gridOptions.data.length] = {
                "ch": "Cox" + i,
                "btn": "Carney" + (i * 2),
                "Rendering engine": "Enormo" + (i + 34),
                "Browser": i % 2,
                "Platform": i % 2,
                "Version": i % 2,
                "Tags": i % 2,
                "Actions": i % 2
            };
        }
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
        };
        vm.currTablePage = 5;
        vm.goToPage = function (flag) {
            if (flag == 'first') {
                vm.currTablePage = 1;
            } else if (flag == 'previous') {
                vm.currTablePage--;
            } else if (flag == 'next') {
                vm.currTablePage++;
            } else if (flag == 'last') {
                vm.currTablePage = vm.gridApi.pagination.getTotalPages();
            } else {
                vm.currTablePage = flag;
                vm.gridApi.pagination.seek(flag);
            }
        };


        vm.gridOptions2 = {         // settings for grid2.
            enableCellSelection: true,
            enableCellEditOnFocus: true,
            enableColumnResizing: true,
            enableColumnMenus: false,
            enableSorting: false,
            rowHeight: 47,
            columnDefs: [{
                field: 'Chk',
                cellTemplate: '<input type="checkbox"/>',
                cellClass: 'text-center',
                width: "5%"
            }, {
                field: 'Edit',
                cellTemplate: '<a href="#"><img src="app/styleguide/imgs/icon_options.png"></a>',
                cellClass: 'text-center',
                width: "10%",
                textAlign: "center"
            }, {
                field: 'Rendering engine',
                cellTemplate: '',
                cellClass: 'text-center',
                width: "20%"
            }, {
                field: 'Browser',
                cellTemplate: '',
                cellClass: 'text-center',
                width: "15%"
            }, {
                field: 'Platform',
                cellClass: 'text-center',
                cellTemplate: '',
                width: "15%"
            }, {
                field: 'Tags',
                cellTemplate: '<span class="badge">High</span>',
                cellClass: 'text-center',
                width: "15%"
            }, {
                field: 'Actions',
                cellTemplate: btns,
                cellClass: 'text-center',
                width: "20%"
            }],
            data: [],
            enablePaginationControls: false,
            paginationPageSize: 9,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0
        };

        for (var i = 1; i <= 100; i++) {
            vm.gridOptions2.data[vm.gridOptions2.data.length] = {
                "ch": "Cox" + i,
                "btn": "Carney" + (i * 2),
                "Rendering engine": "Enormo" + (i + 34),
                "Browser": i % 2,
                "Platform": i % 2,
                "Version": i % 2,
                "Tags": i % 2,
                "Actions": i % 2
            };
        }
        vm.gridOptions2.onRegisterApi = function (gridApi) {
            vm.gridApi2 = gridApi;
        };
        vm.goToPage2 = function (flag) {
            if (flag == 'first') {
                vm.currTablePage = 1;
            } else if (flag == 'previous') {
                vm.currTablePage--;
            } else if (flag == 'next') {
                vm.currTablePage++;
            } else if (flag == 'last') {
                vm.currTablePage = vm.gridApi2.pagination.getTotalPages();
            } else {
                vm.currTablePage = flag;
                vm.gridApi2.pagination.seek(flag);
            }
        };


        // ------------------- For Modals -------------------------------
        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;

        vm.open = function (size) {
            $uibModal.open({
                animation: false,
                templateUrl: 'app/styleguide/templates/modal_template.html',
                controller: 'ModalInstanceCtrl as vm',
                size: size
            });
        };

        vm.toggleAnimation = function () {
            vm.animationsEnabled = !vm.animationsEnabled;
        };

        // ------------------- Date Picker Modals -------------------------------

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy', /*
             maxDate: new Date(2020, 5, 22),
             minDate: new Date(),*/
            startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        vm.popup2 = {
            opened: false
        };
        vm.open2 = function () {
            vm.popup2.opened = true;
        };

        //---------------- Paginations -----------------------
        vm.totalItems = 64;
        vm.currentPage = 4;

        vm.maxSize = 5;

        vm.pageChanged = function () {
            $log.log('Page changed to: ' + vm.currentPage);
        };

        vm.bigTotalItems = 175;
        vm.bigCurrentPage = 1;

        //---------------- Faq -----------------------
        faqText = "Lorem ipsum dolor sit amet nunc. Quisque et commodo volutpat tempus dictum sed, quam. Donec non dui. In commodo wisi. Donec vitae odio nec mauris vitae arcu nec turpis nec est. Vivamus hendrerit wisi. Mauris imperdiet id, bibendum mi, gravida massa volutpat ut, ultricies a," +
            " mauris. Aenean ut metus. Integer in massa. Donec porta, metus hendrerit libero. Nam dictum aliquet porttitor ullamcorper, augue eget dui quis nisl. Vestibulum nibh. Donec vitae erat. In tristique purus. Phasellus a odio. Aenean sed felis. Cum sociis natoque penatibus et lacus eu pede eu pede dictum enim. Mauris ut tortor. In tristique id, imperdiet tempor, sapien pede id nibh. Suspendisse lectus vulputate nunc. Vestibulum euismod orci quis nibh. Duis nonummy id, luctus quam sed dolor sit amet, tellus. Donec est. Vivamus euismod. Integer a condimentum sit amet, iaculis massa. Duis sit amet ligula. Sed ligula eget est. Maecenas quam sed orci elit, pulvinar mollis. Proin posuere. Quisque a adipiscing gravida at, tellus. Curabitur nec elit justo orci luctus bibendum. In ornare lobortis quis, tellus. Quisque quis justo. Nulla massa. Proin cursus, mi leo tristique. Quisque arcu nibh nulla, vitae erat volutpat. Donec nisl a dui. Morbi laoreet, enim sapien quis lorem. Nullam bibendum vitae, vehicula non, quam. Integer eros sem luctus eget, tortor. Etiam varius risus metus semper lobortis. Vivamus orci luctus bibendum. Nulla eu justo. Nam rhoncus, dui porta elementum. Mauris a auctor ligula. Sed hendrerit feugiat lectus blandit eros, id lectus. Nullam aliquet in, cursus non, posuere cubilia Curae, Cras hendrerit sollicitudin augue sit amet dolor. Duis quis dolor. Nam nunc eu orci et velit libero dolor, luctus quis, placerat aliquet. In gravida turpis. Duis porttitor eros ut felis. Praesent ac nunc ac magna vel lorem. Vestibulum euismod nonummy. Phasellus consequat. Donec faucibus turpis. Lorem ipsum et lacus vitae wisi placerat ornare non, arcu. Morbi vitae turpis. Vivamus metus sed eros. Nullam pharetra eget, aliquam arcu. Suspendisse dapibus tellus. Integer est. Maecenas ante. Mauris imperdiet, lorem velit libero hendrerit sagittis. Lorem ipsum sed tortor. Proin consectetuer nisl. Sed nec felis sollicitudin leo eros, rhoncus gravida. Pellentesque molestie vitae, lorem. Vestibulum risus ut viverra a, laoreet sapien. Vestibulum nibh. Sed adipiscing ornare. Maecenas.";
        vm.faqGroups = [
            {
                title: 'Question1',
                content: '1.' + faqText,
                templateUrl: 'app/styleguide/templates/faq_template1.html'
            },
            {
                title: 'Question2',
                content: '2.' + faqText,
                templateUrl: 'app/styleguide/templates/faq_template2.html'
            },
            {
                title: 'Question3',
                content: '3.' + faqText,
                templateUrl: 'app/styleguide/templates/faq_template3.html'
            },
            {
                title: 'Question4',
                content: '4.' + faqText,
                templateUrl: 'app/styleguide/templates/faq_template4.html'
            },
            {
                title: 'Question5',
                content: '5.' + faqText,
                templateUrl: 'app/styleguide/templates/faq_template5.html'
            }
        ];
        //----------------- Notifications ----------------------

        vm.primary = function () {
            Notification('Primary notification');
        };

        vm.error = function () {
            Notification.error('Error notification');
        };

        vm.success = function () {
            Notification.success('Success notification');
        };

        vm.info = function () {
            Notification.info('Information notification');
        };

        vm.warning = function () {
            Notification.warning('Warning notification');
        };

        // using growl
        /*vm.showWarning = function () {
         console.log(growl);
         growl.warning('This is warning message.', {title: 'Warning!'});
         };
         vm.showError = function () {
         growl.error('This is error message.', {title: 'Error!'});
         };
         vm.showSuccess = function () {
         growl.success('This is success message.', {title: 'Success!'});
         };
         vm.showInfo = function () {
         growl.info('This is an info message.', {title: 'Info!'});
         };
         vm.showAll = function () {
         growl.warning('This is warning message.', {title: 'Warning!'});
         growl.error('This is error message.', {title: 'Error!'});
         growl.success('This is success message.', {title: 'Success!'});
         growl.info('This is an info message.', {title: 'Info!'});
         };*/

        //-------------- Progress Bars -------------------------
        vm.max = 200;

        vm.random = function () {
            var value = Math.floor(Math.random() * 100 + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            vm.showWarning = type === 'danger' || type === 'warning';

            vm.dynamic = value;
            vm.type = type;
        };

        vm.random();

        vm.randomStacked = function () {
            vm.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];
            for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
                var index = Math.floor(Math.random() * 4);
                vm.stacked.push({
                    value: Math.floor(Math.random() * 30 + 1),
                    type: types[index]
                });
            }
        };

        vm.randomStacked();

        //--------------- Forms ------------------------

        vm.people = [
            {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
            {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
            {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
            {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
            {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
            {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
            {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
            {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
            {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
            {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
        ];


        //--------------- Special Forms ------------------------

        vm.employees = [
            {name: "January"},
            {name: "February"},
            {name: "March"},
            {name: "April"},
            {name: "May"},
            {name: "June"},
            {name: "July"},
            {name: "August"},
            {name: "September"},
            {name: "October"},
            {name: "November"},
            {name: "December"}
        ];

//---------------------------------------

        vm.example8model = [];
        vm.example8data = [
            {id: 1, label: "Monday"},
            {id: 2, label: "Tuesday"},
            {id: 3, label: "Wednesday"},
            {id: 4, label: "Thursday"},
            {id: 5, label: "Friday"},
            {id: 6, label: "Saturday"},
            {id: 7, label: "Sunday"}
        ];

//---------------------------------------
//---------------------------------------
    }

    function ModalInstanceCtrl($uibModalInstance) {
        var vm = this;
        vm.close = function () {
            $uibModalInstance.close();
        };
    }

    function WizardCtrl($scope, $routeParams, userService, registrationService, yearGenerator) {
        var vm = this;

        vm.currentStep = 0;
        vm.steps = [
            {name: "Step 1", template: "template1"},
            {name: "Step 2", template: "template2"},
            {name: "Step 3", template: "template3"},
            {name: "Step 4", template: "template4"},
            {name: "Step 5", template: "template5"}
        ];

        vm.maxStep = vm.currentStep;
        vm.gotoStep = function (newStep) {
            if (newStep >= vm.maxStep) vm.maxStep = newStep;
            vm.currentStep = newStep;
        };

        vm.getStepTemplate = function () {
            return 'app/styleguide/templates/wizard_' + vm.steps[vm.currentStep].template + '.html';
        };

        vm.save = function () {
            alert('Success!!!');
        };
    }
})
();
