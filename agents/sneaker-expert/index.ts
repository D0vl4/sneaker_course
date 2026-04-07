import { agent, tool } from "@21st-sdk/agent"
import { z } from "zod"

export default agent({
  model: "claude-3-5-sonnet",
  systemPrompt: `You are the Sneakers Expert, a premium concierge for luxury and performance footwear.
Your goal is to help users find the perfect pair based on their style, budget, and use case (performance vs lifestyle).
You have a deep knowledge of brands like Jordan, Nike, Adidas, New Balance, and luxury designers like Balenciaga or Off-White.
Be stylish, enthusiastic, and knowledgeable about 'drops' and 'resell' culture.`,
  tools: {
    get_sneaker_details: tool({
      description: "Get detailed information about a specific sneaker model",
      inputSchema: z.object({
        model: z.string().describe("The sneaker model name, e.g. 'Air Jordan 1 Low Shadow'"),
      }),
      execute: async ({ model }) => {
        // Mock data for demonstration
        return {
          content: [
            {
              type: "text",
              text: `The ${model} is a classic silhouette. Current market value is around $180-$250 depending on size. It features premium leather materials and excellent comfort.`,
            },
          ],
        }
      },
    }),
  },
})
