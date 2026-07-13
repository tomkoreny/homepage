const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json",
};

export function GET() {
	return Response.json(
		{
			"m.server": "matrix.tomkoreny.com:443",
		},
		{ headers: corsHeaders },
	);
}
