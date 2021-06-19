function isSafe(grid,row,col,num)
{
	for(var i=0;i<9;i++)
	{
		if(grid[row][i]==num)
		{
			return false;
		}
		if(grid[i][col]==num)
		{
			return false;
		}
	}
	//for 3x3 box

	var start_row=row-row%3;
	var start_col=col-col%3;
	
	for(var j=start_row;j<start_row+3;j++)
	{
		for(var k=start_col;k<start_col+3;k++)
		{
			if(grid[j][k]==num)
			{
				return false;
			}			
		}
	}
	return true;
}


function showCol(color,id)
{
	var inp=document.getElementById(id)

	if(color='red')
	{
		inp.style.backgroundColor='red';
	}
	if(color='green')
	{
		inp.style.backgroundColor='green';
	}
}

function checkans(grid,e)
{
	var row=e.target.row;
	var col=e.target.col;
	var num=Number(e.data);
	var id=e.target.id;
	if(num='')
	{
		return false;
	}
	for(var i=0;i<9;i++)
	{
		if(grid[row][i]==num)
		{
			showCol('red',id);
			return false;
		}
		if(grid[i][col]==num)
		{
			showCol('red',id);
			return false;
		}
	}
	//for 3x3 box

	var start_row=row-row%3;
	var start_col=col-col%3;
	
	for(var j=start_row;j<start_row+3;j++)
	{
		for(var k=start_col;k<start_col+3;k++)
		{
			if(grid[j][k]==num)
			{
				showCol('red',id);
				return false;
			}			
		}
	}
	showCol('green',id);
	return true;
}

var sudoku = [[],[],[],[],[],[],[],[],[]];

var mycont=document.getElementById("container") ; //variable

for(var i=0; i<9;i++)
{
	for(var j=0; j<9; j++)
	{
		var myin=document.createElement("input");
		myin.style.borderColor='black';
		myin.style.borderWidth='2px';
		
		myin.min='1';
		myin.max='9';
		myin.id = i+''+j;
		var number=Math.ceil(Math.random()*9);

		myin.row=i;
		myin.col=j;

		if(i%3==0)
		{
			myin.style.borderTopColor='#7f00ff';
			myin.style.borderTopWidth='8px';
		}
		if(j%3==0)
		{
			myin.style.borderLeftColor='#7f00ff';
			myin.style.borderLeftWidth='8px';
		}
		if(i==8){
			myin.style.borderBottomColor='#7f00ff';
			myin.style.borderBottomWidth='8px';
		}
		if(j==8)
		{
			myin.style.borderRightColor='#7f00ff';
			myin.style.borderRightWidth='8px';
		}
		if(isSafe(sudoku,i,j,number))
		{
			myin.value=number;
			sudoku[i][j]=number;
			myin.readOnly=true;
		}
		else
		{
			number=0;
			myin.value='';
		}

		mycont.appendChild(myin);
		//event listener
		myin.oninput=function(e){
			if(this.value>9 || this.value<1 || /^[a-zA-Z]*$/.test(this.value))
			{
				alert("Please Enter a Number between 0-9")
			}
			checkans(sudoku,e);
		}
	}
}
