// Define a new module for our app
var app = angular.module("searchApp", []);
function mainController($scope)
{
    var search = $scope;

    search.results = [];
    $scope.count = 0;

    search.submitQuery = function()
    {
        $scope.count = 0;
        console.log("Submit query called");
        // var text = $scope.searchString;
        // alert(text);
        search.query_url = 'http://localhost:8983/solr/techproducts/select?q=';
        // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
        search.query_url += search.searchString;

        $("#new").empty();

        // var hitTemplate = Handlebars.compile($("#hit-template").html());
        //


        // $("#new").append(resultsTitle({text: $scope.searchString, count: $scope.count}));


        // $("#new").append(resultsTitle({text: search.searchString, count: $scope.count}));

        search.results = [];

        // $http.get($scope.url).then(function(response)
        // {
        //     console.log("HTTP "+response.response.docs.length);
        // });

        search.items = [];

        $.getJSON(search.query_url, function(result)
        {
            // alert(result.response.docs.length);
            // $scope.results = result.response.docs;
            for (var i = 0; i < result.response.docs.length; i++)
            {
                $scope.$apply(function ()
                {
                    search.results.push(result.response.docs[i]);
                    $scope.count++;
                });



                // $scope.results.push(result.response.docs[i])
            }

            var resultsTitle = Handlebars.compile($("#results-title").html());
            $("#new").append(resultsTitle({text: search.searchString, count: $scope.count}));
        });

        console.log(search.results.length);

    };

    search.getCount = function ()
    {
        return search.results.length;
    };


}

// Create the instant search filter

// app.filter('searchFor', function(){
//
//     // All filters must return a function. The first parameter
//     // is the data that is to be filtered, and the second is an
//     // argument that may be passed with a colon (searchFor:searchString)
//
//     return function(arr, searchString){
//
//         if(!searchString)
//         {
//             return arr;
//         }
//
//         var result = [];
//
//         searchString = searchString.toLowerCase();
//
//         // Using the forEach helper method to loop through the array
//         angular.forEach(arr, function(item){
//
//             if(item.title.toLowerCase().indexOf(searchString) !== -1){
//                 result.push(item);
//             }
//
//         });
//
//         return result;
//     };
//
// });

// angular.module('instantSearch').controller('searchController',['$scope',function($scope)
function searchController($scope)
{
    $scope.results = [];
    // $scope.count = 0;

    $scope.submitQuery = function()
    {
        console.log("Submit query called");
        // var text = $scope.searchString;
        // alert(text);
        $scope.query_url = 'http://localhost:8983/solr/techproducts/select?q=';
        // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
        $scope.query_url += $scope.searchString;

        $("#new").empty();

        // var hitTemplate = Handlebars.compile($("#hit-template").html());
        //
        var resultsTitle = Handlebars.compile($("#results-title").html());

        // $("#new").append(resultsTitle({text: $scope.searchString, count: $scope.count}));

        $("#new").append(resultsTitle({text: $scope.searchString}));

        $scope.results = [];

        // $http.get($scope.url).then(function(response)
        // {
        //     console.log("HTTP "+response.response.docs.length);
        // });

        $.getJSON($scope.query_url, function(result)
        {
            // alert(result.response.docs.length);
            // $scope.results = result.response.docs;
            for (var i = 0; i < result.response.docs.length; i++)
            {
                $scope.results.push(result.response.docs[i]);
                console.log($scope.results.length);
                // $scope.results.push(result.response.docs[i])
            }
        });



    };

    $scope.getCount = function ()
    {
        return $scope.results.length;
    };

}




// The controller
//
// function searchController($scope){
//
//     // The data model. These items would normally be requested via AJAX,
//     // but are hardcoded here for simplicity. See the next example for
//     // tips on using AJAX.
//
//     $scope.results = [];
//
//     $scope.items = [
//         {
//             url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
//             title: '50 Must-have plugins for extending Twitter Bootstrap'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
//             title: 'Making a Super Simple Registration System With PHP and MySQL'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
//             title: 'Create a slide-out footer with this neat z-index trick'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/06/digital-clock/',
//             title: 'How to Make a Digital Clock with jQuery and CSS3'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
//             title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
//             title: 'Mini AJAX File Upload Form'
//         },
//         {
//             url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
//             title: 'Your First Backbone.js App – Service Chooser'
//         }
//     ];
//
//     // $scope.submitQuery = function()
//     // {
//     //     // var text = $scope.searchString;
//     //     // alert(text);
//     //     $scope.query_url = 'http://localhost:8983/solr/techproducts/select?q=';
//     //     // $scope.query_url += $scope.searchString+"&wt=json&json.wrf=callback";
//     //     $scope.query_url += $scope.searchString;
//     //
//     //
//     //     var hitTemplate = Handlebars.compile($("#hit-template").html());
//     //
//     //     var resultsTitle = Handlebars.compile($("#results-title").html());
//     //
//     //     $("#new").append(resultsTitle({text: $scope.searchString}));
//     //
//     //     $scope.results = [];
//     //
//     //     $.getJSON($scope.query_url, function(result)
//     //     {
//     //         // alert(result.response.docs.length);
//     //         // $scope.results = result.response.docs;
//     //         for (var i = 0; i < result.response.docs.length; i++)
//     //         {
//     //             $scope.results.push(result.response.docs[i])
//     //             // console.log(result.response.docs.length);
//     //             // $("#new").append(hitTemplate({title: result.response.docs[i].name, text: result.response.docs[i].manu}));
//     //         }
//     //     });
//     //
//     // }
//
//
// }
