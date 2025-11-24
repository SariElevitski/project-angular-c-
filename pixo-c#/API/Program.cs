using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// הוספה שלנו
// הרשאות גישה
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
            builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
});
// להוסיף לכל הזרקה
builder.Services.AddScoped(typeof(IDal.Iproduct), typeof(DalSql.ProductDal));
builder.Services.AddScoped(typeof(IBll.IproductBll), typeof(Bll.productBll));

builder.Services.AddDbContext<DalSql.models.PixoContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("MyComputer")));


var app = builder.Build();

app.UseStaticFiles();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//קביעת ההרשאות
app.UseCors("AllowAll");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
