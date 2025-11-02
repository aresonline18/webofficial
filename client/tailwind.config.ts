export default {
    darkMode: [
        "class"
    ],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}"
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            fontFamily: {
                'ivypresto': [
                    'ivypresto-display',
                    'serif'
                ]
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0"
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)"
                    }
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)"
                    },
                    to: {
                        height: "0"
                    }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [
        require("tailwindcss-animate")
    ]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhaWx3aW5kLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhcmtNb2RlOiBbXCJjbGFzc1wiXSxcbiAgY29udGVudDogW1wiLi9wYWdlcy8qKi8qLnt0cyx0c3h9XCIsIFwiLi9jb21wb25lbnRzLyoqLyoue3RzLHRzeH1cIiwgXCIuL2FwcC8qKi8qLnt0cyx0c3h9XCIsIFwiLi9zcmMvKiovKi57dHMsdHN4fVwiXSxcbiAgcHJlZml4OiBcIlwiLFxuICB0aGVtZToge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgY2VudGVyOiB0cnVlLFxuICAgICAgcGFkZGluZzogXCIycmVtXCIsXG4gICAgICBzY3JlZW5zOiB7XG4gICAgICAgIFwiMnhsXCI6IFwiMTQwMHB4XCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXh0ZW5kOiB7XG4gICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICdpdnlwcmVzdG8nOiBbJ2l2eXByZXN0by1kaXNwbGF5JywgJ3NlcmlmJ10sXG4gICAgICB9LFxuICAgICAgY29sb3JzOiB7XG4gICAgICAgIGJvcmRlcjogXCJoc2wodmFyKC0tYm9yZGVyKSlcIixcbiAgICAgICAgaW5wdXQ6IFwiaHNsKHZhcigtLWlucHV0KSlcIixcbiAgICAgICAgcmluZzogXCJoc2wodmFyKC0tcmluZykpXCIsXG4gICAgICAgIGJhY2tncm91bmQ6IFwiaHNsKHZhcigtLWJhY2tncm91bmQpKVwiLFxuICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1mb3JlZ3JvdW5kKSlcIixcbiAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLXByaW1hcnkpKVwiLFxuICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLXByaW1hcnktZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLXNlY29uZGFyeSkpXCIsXG4gICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tc2Vjb25kYXJ5LWZvcmVncm91bmQpKVwiLFxuICAgICAgICB9LFxuICAgICAgICBkZXN0cnVjdGl2ZToge1xuICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLWRlc3RydWN0aXZlKSlcIixcbiAgICAgICAgICBmb3JlZ3JvdW5kOiBcImhzbCh2YXIoLS1kZXN0cnVjdGl2ZS1mb3JlZ3JvdW5kKSlcIixcbiAgICAgICAgfSxcbiAgICAgICAgbXV0ZWQ6IHtcbiAgICAgICAgICBERUZBVUxUOiBcImhzbCh2YXIoLS1tdXRlZCkpXCIsXG4gICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tbXV0ZWQtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGFjY2VudDoge1xuICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLWFjY2VudCkpXCIsXG4gICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tYWNjZW50LWZvcmVncm91bmQpKVwiLFxuICAgICAgICB9LFxuICAgICAgICBwb3BvdmVyOiB7XG4gICAgICAgICAgREVGQVVMVDogXCJoc2wodmFyKC0tcG9wb3ZlcikpXCIsXG4gICAgICAgICAgZm9yZWdyb3VuZDogXCJoc2wodmFyKC0tcG9wb3Zlci1mb3JlZ3JvdW5kKSlcIixcbiAgICAgICAgfSxcbiAgICAgICAgY2FyZDoge1xuICAgICAgICAgIERFRkFVTFQ6IFwiaHNsKHZhcigtLWNhcmQpKVwiLFxuICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLWNhcmQtZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNpZGViYXI6IHtcbiAgICAgICAgICBERUZBVUxUOiBcImhzbCh2YXIoLS1zaWRlYmFyLWJhY2tncm91bmQpKVwiLFxuICAgICAgICAgIGZvcmVncm91bmQ6IFwiaHNsKHZhcigtLXNpZGViYXItZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgcHJpbWFyeTogXCJoc2wodmFyKC0tc2lkZWJhci1wcmltYXJ5KSlcIixcbiAgICAgICAgICBcInByaW1hcnktZm9yZWdyb3VuZFwiOiBcImhzbCh2YXIoLS1zaWRlYmFyLXByaW1hcnktZm9yZWdyb3VuZCkpXCIsXG4gICAgICAgICAgYWNjZW50OiBcImhzbCh2YXIoLS1zaWRlYmFyLWFjY2VudCkpXCIsXG4gICAgICAgICAgXCJhY2NlbnQtZm9yZWdyb3VuZFwiOiBcImhzbCh2YXIoLS1zaWRlYmFyLWFjY2VudC1mb3JlZ3JvdW5kKSlcIixcbiAgICAgICAgICBib3JkZXI6IFwiaHNsKHZhcigtLXNpZGViYXItYm9yZGVyKSlcIixcbiAgICAgICAgICByaW5nOiBcImhzbCh2YXIoLS1zaWRlYmFyLXJpbmcpKVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGJvcmRlclJhZGl1czoge1xuICAgICAgICBsZzogXCJ2YXIoLS1yYWRpdXMpXCIsXG4gICAgICAgIG1kOiBcImNhbGModmFyKC0tcmFkaXVzKSAtIDJweClcIixcbiAgICAgICAgc206IFwiY2FsYyh2YXIoLS1yYWRpdXMpIC0gNHB4KVwiLFxuICAgICAgfSxcbiAgICAgIGtleWZyYW1lczoge1xuICAgICAgICBcImFjY29yZGlvbi1kb3duXCI6IHtcbiAgICAgICAgICBmcm9tOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFwiMFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdG86IHtcbiAgICAgICAgICAgIGhlaWdodDogXCJ2YXIoLS1yYWRpeC1hY2NvcmRpb24tY29udGVudC1oZWlnaHQpXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgXCJhY2NvcmRpb24tdXBcIjoge1xuICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgIGhlaWdodDogXCJ2YXIoLS1yYWRpeC1hY2NvcmRpb24tY29udGVudC1oZWlnaHQpXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgaGVpZ2h0OiBcIjBcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICBcImFjY29yZGlvbi1kb3duXCI6IFwiYWNjb3JkaW9uLWRvd24gMC4ycyBlYXNlLW91dFwiLFxuICAgICAgICBcImFjY29yZGlvbi11cFwiOiBcImFjY29yZGlvbi11cCAwLjJzIGVhc2Utb3V0XCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZXF1aXJlKFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiKV0sXG59IHNhdGlzZmllcyBDb25maWc7XG4iXSwibmFtZXMiOlsiZGFya01vZGUiLCJjb250ZW50IiwicHJlZml4IiwidGhlbWUiLCJjb250YWluZXIiLCJjZW50ZXIiLCJwYWRkaW5nIiwic2NyZWVucyIsImV4dGVuZCIsImZvbnRGYW1pbHkiLCJjb2xvcnMiLCJib3JkZXIiLCJpbnB1dCIsInJpbmciLCJiYWNrZ3JvdW5kIiwiZm9yZWdyb3VuZCIsInByaW1hcnkiLCJERUZBVUxUIiwic2Vjb25kYXJ5IiwiZGVzdHJ1Y3RpdmUiLCJtdXRlZCIsImFjY2VudCIsInBvcG92ZXIiLCJjYXJkIiwic2lkZWJhciIsImJvcmRlclJhZGl1cyIsImxnIiwibWQiLCJzbSIsImtleWZyYW1lcyIsImZyb20iLCJoZWlnaHQiLCJ0byIsImFuaW1hdGlvbiIsInBsdWdpbnMiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiQUFFQSxlQUFlO0lBQ2JBLFVBQVU7UUFBQztLQUFRO0lBQ25CQyxTQUFTO1FBQUM7UUFBeUI7UUFBOEI7UUFBdUI7S0FBc0I7SUFDOUdDLFFBQVE7SUFDUkMsT0FBTztRQUNMQyxXQUFXO1lBQ1RDLFFBQVE7WUFDUkMsU0FBUztZQUNUQyxTQUFTO2dCQUNQLE9BQU87WUFDVDtRQUNGO1FBQ0FDLFFBQVE7WUFDTkMsWUFBWTtnQkFDVixhQUFhO29CQUFDO29CQUFxQjtpQkFBUTtZQUM3QztZQUNBQyxRQUFRO2dCQUNOQyxRQUFRO2dCQUNSQyxPQUFPO2dCQUNQQyxNQUFNO2dCQUNOQyxZQUFZO2dCQUNaQyxZQUFZO2dCQUNaQyxTQUFTO29CQUNQQyxTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBRyxXQUFXO29CQUNURCxTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBSSxhQUFhO29CQUNYRixTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBSyxPQUFPO29CQUNMSCxTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBTSxRQUFRO29CQUNOSixTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBTyxTQUFTO29CQUNQTCxTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBUSxNQUFNO29CQUNKTixTQUFTO29CQUNURixZQUFZO2dCQUNkO2dCQUNBUyxTQUFTO29CQUNQUCxTQUFTO29CQUNURixZQUFZO29CQUNaQyxTQUFTO29CQUNULHNCQUFzQjtvQkFDdEJLLFFBQVE7b0JBQ1IscUJBQXFCO29CQUNyQlYsUUFBUTtvQkFDUkUsTUFBTTtnQkFDUjtZQUNGO1lBQ0FZLGNBQWM7Z0JBQ1pDLElBQUk7Z0JBQ0pDLElBQUk7Z0JBQ0pDLElBQUk7WUFDTjtZQUNBQyxXQUFXO2dCQUNULGtCQUFrQjtvQkFDaEJDLE1BQU07d0JBQ0pDLFFBQVE7b0JBQ1Y7b0JBQ0FDLElBQUk7d0JBQ0ZELFFBQVE7b0JBQ1Y7Z0JBQ0Y7Z0JBQ0EsZ0JBQWdCO29CQUNkRCxNQUFNO3dCQUNKQyxRQUFRO29CQUNWO29CQUNBQyxJQUFJO3dCQUNGRCxRQUFRO29CQUNWO2dCQUNGO1lBQ0Y7WUFDQUUsV0FBVztnQkFDVCxrQkFBa0I7Z0JBQ2xCLGdCQUFnQjtZQUNsQjtRQUNGO0lBQ0Y7SUFDQUMsU0FBUztRQUFDQyxRQUFRO0tBQXVCO0FBQzNDLEVBQW1CIn0=