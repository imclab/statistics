(function() {

    dw.__visMeta = {};

    dw.visualize = (function() {

        var locale = 'en-US',
            metricPrefix = {"3":"k","6":"m","9":"b","12":"t"};

        return function(opts) {

            var chart = dw.chart({
                    type: opts.type,
                    theme: opts.theme,
                    metadata: {
                        visualize: opts.options || {},
                        axes: opts.axes || {}
                    }
                }),
                vis = dw.visualization(opts.type);

            vis.meta = dw.__visMeta[opts.type];
            vis.lang = locale;

            opts.datasource.dataset().done(function(ds) {

                chart.dataset(ds)
                    .locale(locale)
                    .metricPrefix(metricPrefix)
                    .theme(dw.theme(opts.theme))
                    .vis(vis);

                vis.size(opts.container.width(), opts.container.height())
                   .__init()
                   .render(opts.container);
            });
        };

    })();

}).call(this);

dw.__visMeta['data-table'] = {"dimensions": 2, "title": "Data Table", "locale": {"sSearch": "Search:", "sInfoThousands": ",", "sInfoEmpty": "Showing 0 to 0 of 0 entries", "sProcessing": "Processing...", "sEmptyTable": "No data available in table", "sInfoFiltered": "(filtered from _MAX_ total entries)", "oPaginate_sPrevious": "Previous", "oPaginate_sNext": "Next", "oAria_sSortAscending": ": activate to sort column ascending", "sZeroRecords": "No matching records found", "sLoadingRecords": "Loading...", "oPaginate_sLast": "Last", "sLengthMenu": "Show _MENU_ entries", "oPaginate_sFirst": "First", "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries", "oAria_sSortDescending": ": activate to sort column descending"}, "options": {"table-paginate": {"type": "checkbox", "label": "Display content over multiple pages"}, "table-filter": {"type": "checkbox", "label": "Show filter"}, "table-sortable": {"type": "checkbox", "label": "Make columns sortable"}}, "libraries": ["vendor/jquery.dataTables.min.js"], "version": "1.5.0", "id": "data-table", "order": 70};
dw.__visMeta['raphael-chart'] = {"libraries": [{"cdn": "//assets-datawrapper.s3.amazonaws.com/vendor/d3-light/3.1.7/d3-light.min.js", "local": "vendor/d3-light.min.js"}, {"cdn": "//assets-datawrapper.s3.amazonaws.com/vendor/chroma-js/0.5.4/chroma.min.js", "local": "vendor/chroma.min.js"}, {"cdn": "//assets-datawrapper.s3.amazonaws.com/vendor/raphael-js/2.1.2/raphael-min.js", "local": "vendor/raphael-2.1.2.min.js"}], "id": "raphael-chart", "version": "1.5.0"};
dw.__visMeta['column-chart'] = {"dimensions": 1, "title": "Column Chart", "axes": {"labels": {"accepts": ["text", "date"]}, "columns": {"multiple": true, "accepts": ["number"]}}, "id": "column-chart", "version": "1.5.0", "extends": "raphael-chart", "options": {"absolute-scale": {"depends-on": {"chart.min_columns[columns]": 2}, "type": "checkbox", "label": "Use the same scale for all columns"}, "grid-lines": {"default": false, "type": "radio-left", "options": [{"value": "auto", "label": "Automatic"}, {"value": "show", "label": "Show"}, {"value": "hide", "label": "Hide"}], "label": "Grid lines"}, "ignore-missing-values": {"default": false, "type": "checkbox", "label": "Ignore missing values"}, "sort-values": {"type": "checkbox", "label": "Automatically sort bars"}, "reverse-order": {"type": "checkbox", "label": "Reverse order"}, "negative-color": {"depends-on": {"chart.min_value[columns]": "<0"}, "type": "checkbox", "label": "Use different color for negative values"}, "base-color": {"type": "base-color", "label": "Base color"}}, "order": 9};
dw.__visMeta['bar-chart'] = {"dimensions": 1, "title": "Bar Chart", "axes": {"bars": {"multiple": true, "accepts": ["number"]}, "labels": {"accepts": ["text", "date"]}}, "id": "bar-chart", "libraries": [], "version": "1.5.1", "extends": "raphael-chart", "options": {"sort-values": {"type": "checkbox", "label": "Autmatically sort bars"}, "absolute-scale": {"type": "checkbox", "label": "Use the same scale for all columns"}, "reverse-order": {"type": "checkbox", "label": "Reverse order"}, "negative-color": {"depends-on": {"chart.min_value[columns]": "<0"}, "type": "checkbox", "label": "Use different color for negative values"}, "base-color": {"type": "base-color", "label": "Base color"}}, "order": 5};
dw.__visMeta['line-chart'] = {"dimensions": 2, "title": "Line Chart", "locale": {"tooManyLinesToLabel": "Your chart contains <b>more lines than we can label</b>, so automatic labeling is turned off. To fix this <ul><li>filter some columns in the data table in the previous step, or</li><li>use direct labeling and the highlight feature to label the lines that are important to your story.</li></ul>", "couldNotParseAllDates": "Some of the <b>dates in your x-axis could not be parsed</b>, hence the line chart cannot display a proper date axis. To fix this<ul><li>return to the previous step and clean your date column.</li><li><a href='http://blog.datawrapper.de/2013/cleaning-your-data-in-datawrapper/'>Read more about how to do this.</a></li></ul>", "useLogarithmicScale": "Use logarithmic scale"}, "axes": {"y1": {"multiple": true, "accepts": ["number"]}, "x": {"accepts": ["text", "date"]}, "y2": {"multiple": true, "accepts": ["number"], "optional": true}}, "id": "line-chart", "options": {"sep-y-axis": {"type": "separator", "label": "Customize y-Axis"}, "sep-labeling": {"depends-on": {"chart.min_columns[y1]": 2}, "type": "separator", "label": "Customize labeling"}, "direct-labeling": {"default": false, "depends-on": {"chart.min_columns[y1]": 2, "chart.max_columns[y2]": 0}, "type": "checkbox", "help": "Show the labels right nearby the line ends instead of a separate legend", "label": "Direct labeling"}, "fill-between": {"default": false, "depends-on": {"chart.min_columns[y1]": 2, "chart.max_columns[y1]": 2, "chart.max_columns[y2]": 0}, "type": "checkbox", "label": "Fill area between lines"}, "force-banking": {"hidden": true, "type": "checkbox", "label": "Bank the lines to 45 degrees"}, "invert-y-axis": {"default": false, "type": "checkbox", "label": "Invert direction"}, "line-mode": {"default": "straight", "type": "radio-left", "options": [{"value": "straight", "label": "Straight"}, {"value": "curved", "label": "Curved"}, {"value": "stepped", "label": "Stepped"}], "label": "Line interpolation"}, "fill-below": {"depends-on": {"chart.max_columns[y1]": 1, "chart.max_columns[y2]": 0}, "defaut": false, "type": "checkbox", "label": "Fill area below line"}, "legend-position": {"default": "right", "depends-on": {"chart.min_columns[y1]": 2, "direct-labeling": false}, "type": "radio-left", "options": [{"value": "right", "label": "right"}, {"value": "top", "label": "top"}, {"value": "inside", "label": "inside left"}, {"value": "inside-right", "label": "inside right"}], "label": "Legend position"}, "sep-lines": {"type": "separator", "label": "Customize lines"}, "scale-y1": {"default": "linear", "depends-on": {"chart.min_value[y1]": ">0", "chart.magnitude_range[y1]": ">3"}, "type": "radio-left", "options": [{"value": "linear", "label": "linear"}, {"value": "log", "label": "logarithmic"}], "label": "Scale (y-axis)"}, "connect-missing-values": {"type": "checkbox", "label": "Connect lines between missing values"}, "extend-range": {"type": "checkbox", "help": "Extend the y-axis range to nice, rounded values instead of the default range from the minimum to maximum value.", "label": "Extend to nice ticks"}, "baseline-zero": {"type": "checkbox", "label": "Extend to zero"}, "show-grid": {"default": false, "hidden": true, "type": "checkbox", "label": "Show grid"}, "user-change-scale": {"default": false, "depends-on": {"chart.min_value[y1]": ">0", "chart.magnitude_range[y1]": ">3"}, "type": "checkbox", "label": "Let user change scale"}, "base-color": {"type": "base-color", "label": "Base color"}}, "extends": "raphael-chart", "annotations": [{"type": "axis-range", "axis": "x"}, {"type": "axis-point", "axis": "x"}, {"type": "axis-range", "axis": "y"}, {"type": "axis-point", "axis": "y"}, {"type": "data-point"}], "version": "1.5.0", "order": 40};
dw.__visMeta['maps'] = {"version": "0.9.5", "title": "Map (beta)", "locale": {"ids-mismatching": "A significant fraction of your data (%d) could not be assigned to regions of the chosen map. Please make sure that <ul><li>you have selected the correct map and</li><li>that your dataset uses the same identifiers as used in the map.</li></ul>\n                    <p>You may find this <a download='template.csv' href='%t'>template dataset useful</a>.</li></ul>"}, "axes": {"keys": {"accepts": ["text", "number"], "title": "Key"}, "color": {"accepts": ["number", "text"], "title": "Color"}, "tooltip": {"optional": true, "multiple": true, "accepts": ["text", "number", "date"], "title": "Tooltip"}}, "id": "maps", "libraries": [{"cdn": "//assets-datawrapper.s3.amazonaws.com/vendor/kartograph-js/0.8.3/kartograph.min.js", "local": "vendor/kartograph.min.js"}, {"cdn": "//assets-datawrapper.s3.amazonaws.com/vendor/qtip/2.1.1/jquery.qtip.min.js", "local": "vendor/jquery.qtip.min.js"}], "options": {"map": {"type": "map-selector", "options": [{"keys": ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "XK", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SS", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW", "CS", "AN"], "path": "plugins/visualization-maps/maps/1-world", "has_locale": true, "value": "1-world", "label": "Welt"}, {"keys": ["AL", "AD", "AT", "BE", "BG", "BA", "BY", "CH", "CY", "CZ", "DE", "DK", "ES", "EE", "FI", "FR", "FO", "GB", "GE", "GG", "GR", "HR", "HU", "IM", "IE", "IS", "IT", "JE", "JO", "LI", "LT", "LU", "LV", "MC", "MD", "MK", "MT", "ME", "NL", "NO", "PL", "PT", "RO", "RU", "RS", "SK", "SI", "SE", "TR", "UA", "VA"], "path": "plugins/visualization-maps/maps/2-europe", "has_locale": true, "value": "2-europe", "label": "Europa"}, {"keys": ["AGO", "ARE", "BDI", "BEN", "BFA", "BHR", "BWA", "CAF", "CIV", "CMR", "COD", "COG", "COM", "DJI", "DZA", "EGY", "ERI", "ETH", "FRA", "GAB", "GAZ", "GHA", "GIN", "GMB", "GNB", "GNQ", "ISR", "JOR", "KEN", "KWT", "LBN", "LBR", "LBY", "LSO", "MAR", "MDG", "MLI", "MOZ", "MRT", "MWI", "NAM", "NER", "NGA", "OMN", "PR1", "QAT", "RWA", "SAH", "SAU", "SDN", "SDS", "SEN", "SHN", "SLE", "SOL", "SOM", "STP", "SWZ", "SYC", "TCD", "TGO", "TUN", "TZA", "UGA", "WEB", "YEM", "ZAF", "ZMB", "ZWE"], "path": "plugins/visualization-maps/maps/3-africa", "has_locale": true, "value": "3-africa", "label": "Afrika"}, {"keys": ["ATG", "AIA", "ABW", "BRB", "BLM", "BMU", "BES", "BHS", "BLZ", "CAN", "CRI", "CUB", "CUW", "DMA", "DOM", "GRD", "GRL", "GLP", "GTM", "HND", "HTI", "JAM", "KNA", "CYM", "LCA", "MAF", "MTQ", "MSR", "MEX", "NIC", "PAN", "SPM", "PRI", "SLV", "SXM", "TCA", "TTO", "USA", "VCT", "VGB", "VIR", "ANT"], "path": "plugins/visualization-maps/maps/4-north-america", "has_locale": true, "value": "4-north-america", "label": "Nordamerika"}, {"keys": ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "FLK", "GUF", "GUY", "PER", "PRY", "SUR", "URY", "VEN", "FRA", "PAN"], "path": "plugins/visualization-maps/maps/5-south-america", "has_locale": true, "value": "5-south-america", "label": "S\u00fcdamerika"}, {"keys": ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"], "path": "plugins/map-us-admin/us-states", "has_locale": true, "value": "de-states", "label": "Vereinigte Staaten von Amerika"}], "label": "Base map"}, "map-keys": {"axes": [{"id": "keys", "label": "Map key column"}], "type": "select-axis-column", "help": "Please select the column which contains the <b>map region keys</b>."}, "gradient": {"help": "Here you can define a <b>color gradient</b> from which map colors are picked according to the <b>classification</b>.", "color-axis": "color", "depends-on": {"chart.column_type[color]": "number"}, "use-classes": true, "label": "Color gradient", "type": "color-gradient-selector"}, "category-colors": {"keys": "color", "depends-on": {"chart.column_type[color]": "text"}, "type": "color-category-selector", "help": "Here you can select a palette from which the category colors are picked. On top of that you can assign custom colors for each category.", "label": "Category colors"}, "map-data": {"axes": [{"id": "color", "label": "Data column"}], "type": "select-axis-column", "help": "Please select the data columns that contain the <b>data values</b> to be displayed in the map."}, "---map-options---": {"type": "separator", "label": "Configure the map"}}, "extends": "raphael-chart", "order": 92};
dw.__visMeta['pie-chart'] = {"axes": {"labels": {"accepts": ["text", "date"]}, "slices": {"multiple": true, "accepts": ["number"]}}, "dimensions": 1, "author": {"name": "gka", "email": "gka@vis4.net"}, "locale": {"cannotShowNegativeValues": "Pie charts are intended to show part-of-whole relations, and thus they <b>cannot be used to display negative numbers</b>. Please consider using a different chart type instead (eg. a bar chart).", "noMoreThanFiveSlices": "Your data contains <b>more values than can be shown in a pie chart</b>, so we grouped %count slices into the slice named <i>'others'</i>.<p>Why not use a bar chart to allow better comparison of values?</p>", "other": "other"}, "title": "Pie chart", "id": "pie-chart", "libraries": [], "options": {"base-color": {"type": "base-color", "label": "Base color"}}, "extends": "raphael-chart", "version": "1.5.0", "order": 50, "color-by": "row"};
dw.__visMeta['donut-chart'] = {"axes": {"labels": {"accepts": ["text", "date"]}, "slices": {"multiple": true, "accepts": ["number"]}}, "dimensions": 1, "author": {"name": "gka", "email": "gka@vis4.net"}, "title": "Donut chart", "id": "donut-chart", "version": "1.5.0", "extends": "pie-chart", "options": {"show-total": {"default": true, "type": "checkbox", "label": "Show total value in center"}, "custom-total": {"default": false, "depends-on": {"show-total": true, "chart.max_row_num": 1}, "type": "checkbox", "label": "Use custom total value instead of sum"}, "custom-total-value": {"depends-on": {"show-total": true, "custom-total": true}, "type": "text", "label": "Custom total value"}}, "order": 60};
dw.__visMeta['election-donut-chart'] = {"dimensions": 1, "title": "Election Donut", "axes": {"labels": {"accepts": ["text", "date"]}, "slices": {"multiple": true, "accepts": ["number"]}}, "id": "election-donut-chart", "version": "1.5.0", "extends": "donut-chart", "options": {"sort-values": {"default": true, "type": "checkbox", "label": "Sort by size"}, "base-color": {"type": "base-color", "label": "Base color"}}, "order": 60};
dw.__visMeta['grouped-column-chart'] = {"dimensions": 2, "title": "Grouped Column Chart", "axes": {"labels": {"accepts": ["text", "date"]}, "columns": {"multiple": true, "accepts": ["number"]}}, "order": 10, "libraries": [], "version": "1.5.0", "extends": "raphael-chart", "options": {"sort-values": {"type": "checkbox", "label": "Automatically sort bars"}, "reverse-order": {"type": "checkbox", "label": "Reverse order"}, "negative-color": {"depends-on": {"chart.min_value[columns]": "<0"}, "type": "checkbox", "label": "Use different color for negative values"}, "base-color": {"type": "base-color", "label": "Base color"}}, "id": "grouped-column-chart", "color-by": "row"};
dw.__visMeta['stacked-column-chart'] = {"dimensions": 2, "title": "Stacked Column Chart", "locale": {"cannotShowNegativeValues": "Negative values, as contained in your dataset, cannot be stacked on top of each other in a stacked column chart. Please consider using a different chart type instead (eg. a grouped column chart).", "stack percentages": "stack percentages"}, "axes": {"labels": {"accepts": ["text", "date"]}, "columns": {"multiple": true, "accepts": ["number"]}}, "order": 11, "version": "1.5.0", "extends": "grouped-column-chart", "options": {"normalize": {"default": false, "type": "checkbox", "label": "Stack percentages"}, "normalize-user": {"depends-on": {"normalize": true}, "type": "checkbox", "label": "Let user switch mode"}, "sort-values": {"type": "checkbox", "label": "Automatically sort bars"}, "reverse-order": {"type": "checkbox", "label": "Reverse order"}, "negative-color": {"type": "checkbox", "label": "Use different color for negative values"}, "base-color": {"type": "base-color", "label": "Base color"}}, "id": "stacked-column-chart", "color-by": "row"};