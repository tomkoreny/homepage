const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json",
};

export function GET() {
	return Response.json(
		{
			"m.homeserver": {
				base_url: "https://matrix.tomkoreny.com/",
			},
			"org.matrix.msc4143.rtc_foci": [
				{
					type: "livekit",
					livekit_service_url: "https://call.tomkoreny.com/livekit/jwt",
				},
			],
		},
		{ headers: corsHeaders },
	);
}
