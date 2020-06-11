/* Get Data Extension JSON */
$.getJSON("YOUR JSON RESOURCE PAGE", function(json) {
    daily_obj_arr = json;
    var extended_timeline = [];
    for (var j = 0; j < daily_obj_arr.length; ++j) {
        var getDate = daily_obj_arr[j].eventDate;
        var formatter = new Intl.DateTimeFormat("en", {
                month: "short",
                day: "numeric"
            }),
            newDate = formatter.format(new Date(getDate));
        extended_timeline.push(newDate.toUpperCase());
    }
    /* Map Data Extension Values By Type For Chart Display */
    var clicks = daily_obj_arr.map(function(a) {
        return parseInt(a.click);
    });
    var sent = daily_obj_arr.map(function(a) {
        return parseInt(a.sent);
    });
    var opens = daily_obj_arr.map(function(a) {
        return parseInt(a.open);
    });
    var bounces = daily_obj_arr.map(function(a) {
        return parseInt(a.bounce);
    });
    /* Functions For Styling and Formatting Chart */
    demo = {
        initPickColor: function() {
            $('.pick-class-label').click(function() {
                var new_class = $(this).attr('new-class');
                var old_class = $('#display-buttons').attr('data-class');
                var display_div = $('#display-buttons');
                if (display_div.length) {
                    var display_buttons = display_div.find('.btn');
                    display_buttons.removeClass(old_class);
                    display_buttons.addClass(new_class);
                    display_div.attr('data-class', new_class);
                }
            });
        },
        /* Initialize Chart */
        initDashboardPageCharts: function() {
            gradientChartOptionsConfigurationWithTooltipPurple = {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: '#f5f5f5',
                    titleFontColor: '#333',
                    bodyFontColor: '#666',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest"
                },
                responsive: true,
                scales: {
                    yAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(29,140,248,0.0)',
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            suggestedMin: 60,
                            suggestedMax: 125,
                            padding: 20,
                            fontColor: "#9a9a9a"
                        }
                    }],
                    xAxes: [{
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(225,78,202,0.1)',
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a"
                        }
                    }]
                }
            };
            var chart_labels = extended_timeline;
            var chart_data = sent;
            var ctx = document.getElementById("email_stats").getContext('2d');
            var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
            gradientStroke.addColorStop(0.4, 'rgba(108,102,251,0.3)');
            gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
            var config = {
                type: 'line',
                data: {
                    labels: chart_labels,
                    datasets: [{
                        label: "Sent",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: '#6C66FB',
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: '#6C66FB',
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: '#6C66FB',
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: chart_data,
                    }]
                },
                options: gradientChartOptionsConfigurationWithTooltipPurple,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: Math.min.apply(this, chart_data),
                            max: Math.max.apply(this, chart_data),
                            stepSize: 5
                        }
                    }]
                }
            };
            /* Update Chart Data When New Type Is Selected */
            var myChartData = new Chart(ctx, config);
            $("#0").click(function() {
                var data = myChartData.config.data;
                data.datasets[0].data = sent;
                data.datasets[0].label = "Sent";
                data.labels = chart_labels;
                myChartData.update();
            });
            $("#1").click(function() {
                var chart_data = opens;
                var data = myChartData.config.data;
                data.datasets[0].data = chart_data;
                data.datasets[0].label = "Opens";
                data.labels = chart_labels;
                myChartData.update();
            });

            $("#2").click(function() {
                var chart_data = clicks;
                var data = myChartData.config.data;
                data.datasets[0].data = chart_data;
                data.datasets[0].label = "Clicks";
                data.labels = chart_labels;
                myChartData.update();
            });

            $("#3").click(function() {
                var chart_data = bounces;
                var data = myChartData.config.data;
                data.datasets[0].data = chart_data;
                data.datasets[0].label = "Bounces";
                data.labels = chart_labels;
                myChartData.update();
            });
        }
    };
    /* Execute Chart Function */
    demo.initDashboardPageCharts();
});
