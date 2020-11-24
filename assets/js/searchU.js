$(document).ready(function(){
	$('#search').on('keyup',function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();

		$.ajax({
			url: '/admin/search',
			method: 'post',
			datatype : 'json',
			data : {'search':search,
					'searchby':searchby},
			success:function(response){
				if(response.n !== 'error'){
					var tableBody="<tr><td>user_id</td> <td>name</td> <td>user_type</td></tr>";
					response.n.forEach(element => { 
						var tableRow="2";
						tableRow+="<td>"+element.user_id+"</td>";
                        tableRow+="<td>"+element.name+"</td>";
                        tableRow+="<td>"+element.user_type+"</td>";
					//	tableRow += "<td><a href='/admin/delete/"+element.user_id+"'>Remove</a></td>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('#table').html(tableBody);
				}else{

				}
			},
			error:function(response){
				alert('server error');
			}
		});
	});
});