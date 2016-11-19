(function () {

    /* global angular */
    angular.module('styleguide')
        .controller('styleguideController', styleguideController)
        .controller('ModalInstanceController', ModalInstanceController);

    styleguideController.$inject = ['$uibModal'];

    ModalInstanceController.$inject = ['$uibModalInstance'];

    function styleguideController($uibModal) {
        vm = this;

        vm.currPage = 'tooltip';
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
        vm.goToPage = function (flag) {
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
                controller: 'ModalInstanceController as vm',
                size: size
            });
        };

        vm.toggleAnimation = function () {
            vm.animationsEnabled = !vm.animationsEnabled;
        };

        // ------------------- Date Picker Modals -------------------------------

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
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
        vm.open2 = function() {
            vm.popup2.opened = true;
        };

    }

    function ModalInstanceController($uibModalInstance) {
        var vm = this;
        vm.close = function () {
            $uibModalInstance.close();
        };
    }
})();
