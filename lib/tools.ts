// تعريف الأدوات المتاحة للتطبيق
// تم استخلاصها من compatibility-test/tools.ts
import { Tool } from "openai/resources/beta/threads/messages";

export interface ToolDefinition {
  type: "function";
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description?: string; enum?: string[]; default?: any; minimum?: number; maximum?: number }>;
    required: string[];
    additionalProperties: boolean;
  };
  output: string; // مثال على الإخراج المتوقع
}

export const TOOLS: ToolDefinition[] = [
  // أدوات التكامل الجديدة
  {
    type: "function",
    name: "canva_design_export",
    description: "Discover, auto-fill, and export Canva designs in one place. Use this to generate and retrieve design assets.",
    parameters: {
      type: "object",
      properties: {
        design_id: { type: "string", description: "The ID of the Canva design to process." },
        export_format: { type: "string", enum: ["PNG", "JPG", "PDF"], description: "The desired export format." },
      },
      required: ["design_id", "export_format"],
      additionalProperties: false,
    },
    output: '{"status":"success","file_url":"https://canva.com/export/design_id.png"}',
  },
  {
    type: "function",
    name: "webflow_manage_site",
    description: "Manage Webflow sites, edit pages, and organize CMS content easily. Use for content updates or site structure changes.",
    parameters: {
      type: "object",
      properties: {
        site_id: { type: "string", description: "The ID of the Webflow site." },
        action: { type: "string", enum: ["update_page", "get_cms_item"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["site_id", "action"],
      additionalProperties: true,
    },
    output: '{"status":"success","message":"Webflow action completed."}',
  },
  {
    type: "function",
    name: "wix_site_search",
    description: "Search site data, access content, and automate workflows within Wix.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query for Wix site data." },
        content_type: { type: "string", enum: ["blog", "products", "pages"], description: "The type of content to search." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    output: '{"status":"success","results":[]}',
  },
  {
    type: "function",
    name: "fireflies_transcribe",
    description: "Automate meeting transcription and gain conversation insights.",
    parameters: {
      type: "object",
      properties: {
        meeting_url: { type: "string", description: "URL of the meeting recording." },
      },
      required: ["meeting_url"],
      additionalProperties: false,
    },
    output: '{"status":"success","transcript_id":"ff123","summary":"Meeting summarized."}',
  },
  {
    type: "function",
    name: "tldv_meeting_summary",
    description: "Streamline meeting workflows with transcription and call highlights.",
    parameters: {
      type: "object",
      properties: {
        call_id: { type: "string", description: "The ID of the tl;dv call." },
        action: { type: "string", enum: ["get_highlights", "generate_summary"], description: "The action to perform." },
      },
      required: ["call_id", "action"],
      additionalProperties: false,
    },
    output: '{"status":"success","data":[]}',
  },
  {
    type: "function",
    name: "firecrawl_extract_data",
    description: "Unlock powerful web data extraction, crawling, and search capabilities.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "The URL to crawl or extract data from." },
        mode: { type: "string", enum: ["crawl", "extract"], description: "Crawl the site or extract data from a single page." },
      },
      required: ["url", "mode"],
      additionalProperties: false,
    },
    output: '{"status":"success","extracted_data":{}}',
  },
  {
    type: "function",
    name: "todoist_manage_task",
    description: "Organize daily tasks, streamline projects, and boost productivity.",
    parameters: {
      type: "object",
      properties: {
        task_name: { type: "string", description: "The name of the task." },
        project_id: { type: "string", description: "The ID of the project to add the task to." },
        due_date: { type: "string", description: "The due date for the task (e.g., '2025-12-31')." },
      },
      required: ["task_name"],
      additionalProperties: false,
    },
    output: '{"status":"success","task_id":"t123"}',
  },
  {
    type: "function",
    name: "metabase_query",
    description: "Query Metabase for business intelligence data.",
    parameters: {
      type: "object",
      properties: {
        question_id: { type: "integer", description: "The ID of the Metabase question/dashboard." },
        filters: { type: "object", description: "Optional filters to apply to the query." },
      },
      required: ["question_id"],
      additionalProperties: true,
    },
    output: '{"status":"success","data":[]}',
  },
  {
    type: "function",
    name: "clickup_manage_task",
    description: "Automate task management and project workflows with ClickUp.",
    parameters: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "The ID of the ClickUp task." },
        action: { type: "string", enum: ["create", "update", "get"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["action"],
      additionalProperties: true,
    },
    output: '{"status":"success","task_details":{}}',
  },
  {
    type: "function",
    name: "supabase_query",
    description: "Manage Supabase projects, query databases, and organize data efficiently.",
    parameters: {
      type: "object",
      properties: {
        table_name: { type: "string", description: "The name of the Supabase table." },
        select_columns: { type: "string", description: "Columns to select (e.g., 'id, name')." },
        filters: { type: "string", description: "Filters to apply (e.g., 'status.eq.active')." },
      },
      required: ["table_name", "select_columns"],
      additionalProperties: false,
    },
    output: '{"status":"success","rows":[]}',
  },
  {
    type: "function",
    name: "vercel_manage_project",
    description: "Manage Vercel projects, deployments, and domains.",
    parameters: {
      type: "object",
      properties: {
        project_id: { type: "string", description: "The ID of the Vercel project." },
        action: { type: "string", enum: ["deploy", "get_status", "list_domains"], description: "The action to perform." },
      },
      required: ["project_id", "action"],
      additionalProperties: false,
    },
    output: '{"status":"success","deployment_url":"https://...","message":"Deployment initiated."}',
  },
  {
    type: "function",
    name: "neon_query_db",
    description: "Use natural language to query and manage a PostgreSQL database via Neon.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "The natural language query or SQL statement." },
        database_name: { type: "string", description: "The name of the Neon database." },
      },
      required: ["query", "database_name"],
      additionalProperties: false,
    },
    output: '{"status":"success","results":[]}',
  },
  {
    type: "function",
    name: "postgresql_execute",
    description: "Connect to PostgreSQL, manage databases, and query data securely and efficiently.",
    parameters: {
      type: "object",
      properties: {
        sql_query: { type: "string", description: "The SQL query to execute." },
        connection_id: { type: "string", description: "The ID of the PostgreSQL connection." },
      },
      required: ["sql_query", "connection_id"],
      additionalProperties: false,
    },
    output: '{"status":"success","rows_affected":1}',
  },
  {
    type: "function",
    name: "sentry_review_error",
    description: "Review errors, analyze root causes, and suggest fixes to accelerate issue resolution.",
    parameters: {
      type: "object",
      properties: {
        issue_id: { type: "string", description: "The ID of the Sentry issue." },
        action: { type: "string", enum: ["get_details", "suggest_fix"], description: "The action to perform." },
      },
      required: ["issue_id", "action"],
      additionalProperties: false,
    },
    output: '{"status":"success","analysis":"Root cause identified."}',
  },
  {
    type: "function",
    name: "huggingface_explore",
    description: "Explore AI models, view datasets, and discover the latest research trends.",
    parameters: {
      type: "object",
      properties: {
        search_query: { type: "string", description: "The query to search models or datasets." },
        type: { type: "string", enum: ["model", "dataset", "space"], description: "The type of resource to search." },
      },
      required: ["search_query", "type"],
      additionalProperties: false,
    },
    output: '{"status":"success","results":[]}',
  },
  {
    type: "function",
    name: "notion_manage_content",
    description: "Search workspace content, update notes, and automate workflows in Notion.",
    parameters: {
      type: "object",
      properties: {
        page_id: { type: "string", description: "The ID of the Notion page or database." },
        action: { type: "string", enum: ["search", "update_page"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["page_id", "action"],
      additionalProperties: true,
    },
    output: '{"status":"success","message":"Notion content updated."}',
  },
  {
    type: "function",
    name: "zapier_automate_workflow",
    description: "Connect and automate workflows across thousands of apps using Zapier.",
    parameters: {
      type: "object",
      properties: {
        zap_id: { type: "string", description: "The ID of the Zapier Zap to trigger." },
        payload: { type: "object", description: "Data to send to the Zapier Zap." },
      },
      required: ["zap_id", "payload"],
      additionalProperties: true,
    },
    output: '{"status":"success","message":"Zapier workflow triggered."}',
  },
  {
    type: "function",
    name: "asana_manage_task",
    description: "Streamline project and task management with Asana.",
    parameters: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "The ID of the Asana task." },
        action: { type: "string", enum: ["create", "update", "get"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["action"],
      additionalProperties: true,
    },
    output: '{"status":"success","task_details":{}}',
  },
  {
    type: "function",
    name: "monday_manage_board",
    description: "Coordinate tasks, manage boards, and streamline project workflows on monday.com.",
    parameters: {
      type: "object",
      properties: {
        board_id: { type: "string", description: "The ID of the monday.com board." },
        action: { type: "string", enum: ["create_item", "update_column"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["board_id", "action"],
      additionalProperties: true,
    },
    output: '{"status":"success","item_id":"m123"}',
  },
  {
    type: "function",
    name: "make_automate_scenario",
    description: "Convert Make workflows into AI tools for intelligent automation.",
    parameters: {
      type: "object",
      properties: {
        scenario_id: { type: "string", description: "The ID of the Make scenario (formerly Integromat)." },
        payload: { type: "object", description: "Data to send to the Make scenario." },
      },
      required: ["scenario_id", "payload"],
      additionalProperties: true,
    },
    output: '{"status":"success","message":"Make scenario executed."}',
  },
  {
    type: "function",
    name: "linear_manage_issue",
    description: "Track issues, manage projects, and organize workflows across your team.",
    parameters: {
      type: "object",
      properties: {
        issue_id: { type: "string", description: "The ID of the Linear issue." },
        action: { type: "string", enum: ["create", "update", "get"], description: "The action to perform." },
        data: { type: "object", description: "Data payload for the action." },
      },
      required: ["action"],
      additionalProperties: true,
    },
    output: '{"status":"success","issue_details":{}}',
  },
  {
    type: "function",
    name: "n8n_execute_workflow",
    description: "Executes a specific n8n workflow using the Model Context Protocol (MCP) server. Use this to automate tasks, integrate with external services, or trigger complex business logic.",
    parameters: {
      type: "object",
      properties: {
        workflow_id: {
          type: "string",
          description: "The unique ID of the n8n workflow to execute. This ID must be enabled for workflow access in n8n settings.",
        },
        data: {
          type: "object",
          description: "A JSON object containing the data to be passed as input to the n8n workflow.",
          additionalProperties: true,
        },
      },
      required: ["workflow_id", "data"],
      additionalProperties: false,
    },
    output: '{"status":"success","execution_id":"12345","message":"Workflow execution initiated."}',
  },
  {
    type: "function",
    name: "get_weather",
    description: "Get the weather for a given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The location to get the weather for",
        },
      },
      required: ["location"],
      additionalProperties: false,
    },
    output: '{"weather":"sunny"}',
  },
  {
    type: "function",
    name: "get_system_health",
    description:
      "Returns the current health status of the LLM runtime—use before critical operations to verify the service is live.",
    parameters: { type: "object", properties: {}, required: [], additionalProperties: false },
    output: '{"status":"ok","uptime_seconds":372045}',
  },
  {
    type: "function",
    name: "markdown_to_html",
    description:
      "Converts a Markdown string to sanitized HTML—use when you need browser-renderable output.",
    parameters: {
      type: "object",
      properties: {
        markdown: { type: "string", description: "Raw Markdown content" },
      },
      required: ["markdown"],
      additionalProperties: false,
    },
    output: '{"html":"<h1>Hello World</h1><p>This is <em>great</em>.</p>"}',
  },
  {
    type: "function",
    name: "detect_language",
    description:
      "Identifies the ISO language code of the supplied text—use for routing text to language-specific models.",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Text whose language should be detected",
        },
      },
      required: ["text"],
      additionalProperties: false,
    },
    output: '{"language":"de","confidence":0.98}',
  },
  {
    type: "function",
    name: "generate_chart",
    description:
      "Creates a base64-encoded PNG chart from tabular data—use for quick visualizations inside chat.",
    parameters: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: { type: "array", items: { type: "number" } },
          description: "2-D numeric data matrix",
        },
        chart_type: {
          type: "string",
          enum: ["line", "bar", "scatter"],
          description: "Type of chart to generate",
        },
        title: {
          type: "string",
          description: "Chart title",
          default: "",
        },
        x_label: {
          type: "string",
          description: "Label for the x-axis",
          default: "",
        },
        y_label: {
          type: "string",
          description: "Label for the y-axis",
          default: "",
        },
      },
      required: ["data", "chart_type"],
      additionalProperties: false,
    },
    output: '{"image_png_base64":"iVBORw0KGgoAAAANSUhEUgAA..."}',
  },
  {
    type: "function",
    name: "query_database",
    description:
      "Runs a parameterized SQL SELECT on the internal analytics DB—use for lightweight data look-ups.",
    parameters: {
      type: "object",
      properties: {
        table: { type: "string", description: "Table name to query" },
        columns: {
          type: "array",
          items: { type: "string" },
          description: "Columns to return",
        },
        filters: {
          type: "string",
          description: "SQL WHERE clause without the word WHERE",
          default: "",
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 10000,
          description: "Max rows to return",
          default: 100,
        },
        order_by: {
          type: "string",
          description: "Column to order by (optional)",
          default: "",
        },
      },
      required: ["table", "columns"],
      additionalProperties: false,
    },
    output:
      '{"rows":[{"id":1,"email":"user@example.com"},{"id":2,"email":"foo@bar.com"}],"row_count":2}',
  },
];

// دالة محاكاة لتنفيذ الأدوات (Mock Tool Execution)
export async function executeTool(toolName: string, args: Record<string, any>): Promise<string> {
  const toolDef = TOOLS.find(t => t.name === toolName);
  if (!toolDef) {
    throw new Error(`Tool ${toolName} not found.`);
  }

  // في تطبيق حقيقي، سيتم هنا استدعاء الوظيفة الفعلية للأداة.
  // هنا، نستخدم الإخراج المحاكي (mock output) من ملف compatibility-test/tools.ts
  if (toolName === "n8n_execute_workflow") {
    // هنا يجب أن يتم استدعاء n8n MCP Server
    // لغرض المحاكاة، سنستخدم الإخراج المحاكي
    console.log(`Executing n8n workflow ${args.workflow_id} with data:`, args.data);
    return '{"status":"success","execution_id":"12345","message":"Workflow execution initiated."}';
  }

  // في تطبيق حقيقي، سيتم هنا استدعاء الوظيفة الفعلية للأداة.
  // هنا، نستخدم الإخراج المحاكي (mock output) من ملف compatibility-test/tools.ts
  return toolDef.output;
}
