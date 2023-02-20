using Microsoft.EntityFrameworkCore;
using ServiceFUEN.Models.EFModels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var ProjectFUENconnectionString = builder.Configuration.GetConnectionString("ProjectFUEN") ?? throw new InvalidOperationException("Connection string 'azure' not found.");
builder.Services.AddDbContext<ProjectFUENContext>(options =>
    options.UseSqlServer(ProjectFUENconnectionString));

builder.Services.AddControllers();

string MyAllowOrigins = "AllowAny";
builder.Services.AddCors(options => {
    options.AddPolicy(
            name: MyAllowOrigins,
            policy => policy.WithOrigins("*")
            .WithHeaders("*")
            .WithMethods("*"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseDefaultFiles();
app.Use(async (context, next) =>
{
    await next();
    // �P�_�O�_�n�s�������A�Ӥ��O�oapi�ШD
    if (context.Response.StatusCode == 404 &&  // �Ӹ귽���s�b
        !System.IO.Path.HasExtension(context.Request.Path.Value) && // ���}�̫�S���a���ɦW
        !context.Request.Path.Value.StartsWith("/api")) // ���}���O/api�}�Y
    {
        context.Request.Path = "/index.html"; // �N���}�令index.html
        context.Response.StatusCode = 200; // �ñNHTTP���A�X�]200���\
        await next();
    }
});
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
