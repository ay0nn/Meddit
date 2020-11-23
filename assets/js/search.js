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
					var tableBody="<tr><td>nid</td><td>notice</td><td>Posted Date</td><td>Action</td></tr>";
					response.n.forEach(element => { 
						var tableRow="";
						tableRow+="<td>"+element.nid+"</td>";
                        tableRow+="<td>"+element.notice+"</td>";
                        tableRow+="<td>"+element.date+"</td>";
						tableRow += "<td><a href='/admin/delete/"+element.nid+"'>Delete</a></td>";
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